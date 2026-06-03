/* ============================================================
   GRUVBOX COZY — preview overlay controller (vanilla)
   Builds: command palette · quick switcher · settings ·
           graph view · context menu · hint strip
   API: window.gbScene('palette'|'switcher'|'settings'|'graph')
        window.gbCloseOverlays()
   ============================================================ */
(function () {
	const app = document.getElementById('gbApp');
	const svg = (p, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 2}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
	const I = {
		file: svg('<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/>'),
		search: svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>'),
		eye: svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
		cmd: svg('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/>'),
		graph: svg('<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="13" cy="17" r="2.4"/><path d="M8 8l4 7M16 8l-2 7"/>'),
		gear: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
		side: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),
		star: svg('<path d="M12 3l2.5 6 6.5.5-5 4.2 1.6 6.3L12 17l-5.6 3 1.6-6.3-5-4.2 6.5-.5z"/>'),
		tmpl: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
		clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
		palette: svg('<path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-.8-1.5-.8-2.5 1-1.5 2-1.5h1.3A4.5 4.5 0 0 0 22 11 10 10 0 0 0 12 2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="11" r="1"/>'),
		cut: svg('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.5 15.5M14.5 14.5L20 20M8.5 8.5L12 12"/>'),
		copy: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
		paste: svg('<path d="M9 4h6v3H9z"/><path d="M7 5H5v16h14V5h-2"/>'),
		pencil: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
		trash: svg('<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>'),
		link: svg('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>'),
		font: svg('<path d="M4 20l5-14 5 14M6 14h6M16 20l3-9 3 9M17.5 16.5h3"/>'),
		monitor: svg('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
		keyboard: svg('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
		hotkey: svg('<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M7 14h10"/>'),
		plug: svg('<path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v6"/>'),
	};
	const K = (s) => `<span class="kbd">${s}</span>`;
	const MOD = navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl';

	/* ---------------- data ---------------- */
	const COMMANDS = [
		{ g: 'Recent' },
		{ i: I.eye, t: 'Toggle reading view', hk: [MOD, 'E'] },
		{ i: I.palette, t: 'Style Settings: Show panel' },
		{ g: 'Commands' },
		{ i: I.cmd, t: 'Open command palette', hk: [MOD, 'P'] },
		{ i: I.search, t: 'Quick switcher: Open', hk: [MOD, 'O'] },
		{ i: I.graph, t: 'Graph view: Open', hk: [MOD, 'G'] },
		{ i: I.tmpl, t: 'Templates: Insert template' },
		{ i: I.side, t: 'Toggle left sidebar', hk: [MOD, '\\'] },
		{ i: I.star, t: 'Bookmarks: Bookmark current file' },
		{ i: I.clock, t: 'Daily notes: Open today\u2019s note' },
		{ i: I.gear, t: 'Open settings', hk: [MOD, ','] },
	];
	const FILES = [
		{ t: 'retro-groove', p: 'Themes/' },
		{ t: 'palette', p: 'Themes/' },
		{ t: 'install', p: 'Themes/' },
		{ t: '2026-06-03', p: 'Daily/' },
		{ t: '2026-06-02', p: 'Daily/' },
		{ t: 'quick capture', p: 'Inbox/' },
		{ t: 'README', p: '' },
	];

	/* ---------------- build shells ---------------- */
	const backdrop = el('div', 'ov-backdrop', '<div id="gbModal"></div>');
	const graph = buildGraph();
	const ctx = el('div', 'ctx-menu'); ctx.id = 'gbCtx';
	const hints = buildHints();
	app.append(backdrop, graph, ctx, hints);
	const modal = backdrop.querySelector('#gbModal');

	let scene = null, sel = 0, list = [];

	/* ---------------- scenes ---------------- */
	function openPalette() {
		scene = 'palette';
		modal.className = 'prompt';
		modal.innerHTML =
			`<div class="prompt-input-wrap"><input class="prompt-input" placeholder="Select a command\u2026" value=""></div>
			 <div class="prompt-results" id="gbList"></div>
			 <div class="prompt-instructions"><span>${K('\u2191')}${K('\u2193')} <b>navigate</b></span><span>${K('\u21B5')} <b>use</b></span><span>${K('esc')} <b>dismiss</b></span></div>`;
		renderList(COMMANDS.map(c => c.g ? { group: c.g } : { i: c.i, t: c.t, right: c.hk ? c.hk.map(K).join('') : '' }));
		show();
	}
	function openSwitcher() {
		scene = 'switcher';
		modal.className = 'prompt';
		modal.innerHTML =
			`<div class="prompt-input-wrap"><input class="prompt-input" placeholder="Find or create a note\u2026" value=""></div>
			 <div class="prompt-results" id="gbList"></div>
			 <div class="prompt-instructions"><span>${K('\u2191')}${K('\u2193')} <b>navigate</b></span><span>${K('\u21B5')} <b>open</b></span><span>${K(MOD + ' \u21B5')} <b>new pane</b></span></div>`;
		renderList(FILES.map(f => ({ i: I.file, t: f.t, path: f.p })));
		show();
	}
	function openSettings() {
		scene = 'settings';
		modal.className = 'modal-settings';
		modal.innerHTML = settingsHTML();
		show();
	}
	function openGraph() {
		scene = 'graph';
		graph.classList.add('show');
		bindEsc();
	}

	function renderList(items) {
		list = items; sel = items.findIndex(x => !x.group);
		const box = modal.querySelector('#gbList');
		box.innerHTML = items.map((x, idx) => {
			if (x.group) return `<div class="sugg-group">${x.group}</div>`;
			const right = x.right ? `<span class="hk">${x.right}</span>` : (x.path !== undefined ? `<span class="s-path">${x.path}</span>` : '');
			return `<div class="sugg" data-idx="${idx}"><span class="s-ico">${x.i}</span><span class="s-title">${x.t}</span>${right}</div>`;
		}).join('');
		paintSel();
		box.querySelectorAll('.sugg').forEach(node => {
			node.addEventListener('mousemove', () => { sel = +node.dataset.idx; paintSel(); });
			node.addEventListener('click', () => close());
		});
		const input = modal.querySelector('.prompt-input');
		if (input) setTimeout(() => input.focus(), 30);
	}
	function paintSel() {
		modal.querySelectorAll('.sugg').forEach(n => n.classList.toggle('is-selected', +n.dataset.idx === sel));
		const cur = modal.querySelector('.sugg.is-selected');
		if (cur) cur.scrollIntoView({ block: 'nearest' });
	}
	function move(dir) {
		if (!list.length) return;
		let i = sel;
		for (let n = 0; n < list.length; n++) {
			i = (i + dir + list.length) % list.length;
			if (!list[i].group) { sel = i; break; }
		}
		paintSel();
	}

	/* ---------------- show / close ---------------- */
	function show() { backdrop.classList.add('show'); bindEsc(); }
	function close() {
		backdrop.classList.remove('show');
		graph.classList.remove('show');
		ctx.classList.remove('show');
		scene = null;
	}
	window.gbCloseOverlays = close;
	window.gbScene = (name) => {
		close();
		if (name === 'palette') openPalette();
		else if (name === 'switcher') openSwitcher();
		else if (name === 'settings') openSettings();
		else if (name === 'graph') openGraph();
	};

	let escBound = false;
	function bindEsc() { escBound = true; }

	backdrop.addEventListener('mousedown', (e) => { if (e.target === backdrop) close(); });

	/* ---------------- keyboard ---------------- */
	document.addEventListener('keydown', (e) => {
		const mod = e.metaKey || e.ctrlKey;
		if (mod && e.key.toLowerCase() === 'p') { e.preventDefault(); window.gbScene('palette'); return; }
		if (mod && e.key.toLowerCase() === 'o') { e.preventDefault(); window.gbScene('switcher'); return; }
		if (mod && e.key === ',') { e.preventDefault(); window.gbScene('settings'); return; }
		if (mod && e.key.toLowerCase() === 'g') { e.preventDefault(); window.gbScene('graph'); return; }
		if (e.key === 'Escape') { close(); return; }
		if (scene === 'palette' || scene === 'switcher') {
			if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
			else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
			else if (e.key === 'Enter') { e.preventDefault(); close(); }
		}
	});

	/* ---------------- context menu on editor ---------------- */
	const editor = document.querySelector('.editor');
	if (editor) {
		editor.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			ctx.innerHTML =
				row(I.cut, 'Cut', MOD + ' X') + row(I.copy, 'Copy', MOD + ' C') + row(I.paste, 'Paste', MOD + ' V') +
				sep() + row(I.link, 'Copy link to block') + row(I.star, 'Bookmark\u2026') +
				sep() + row(I.pencil, 'Rename\u2026', 'F2') + row(I.trash, 'Delete', '', 'danger');
			const r = app.getBoundingClientRect();
			let x = e.clientX - r.left, y = e.clientY - r.top;
			ctx.style.left = Math.min(x, r.width - 220) + 'px';
			ctx.style.top = Math.min(y, r.height - 320) + 'px';
			ctx.classList.add('show');
			ctx.querySelectorAll('.ctx-item').forEach(it => it.addEventListener('click', () => ctx.classList.remove('show')));
		});
	}
	document.addEventListener('mousedown', (e) => { if (!ctx.contains(e.target)) ctx.classList.remove('show'); });

	/* ---------------- helpers ---------------- */
	function row(i, t, hk, cls) {
		return `<div class="ctx-item ${cls || ''}"><span>${i}</span><span>${t}</span>${hk ? `<span class="ctx-hk">${hk}</span>` : ''}</div>`;
	}
	function sep() { return '<div class="ctx-sep"></div>'; }
	function el(tag, cls, html) { const n = document.createElement(tag); n.className = cls; if (html) n.innerHTML = html; return n; }

	function buildHints() {
		const h = el('div', 'hint-strip');
		const btns = [
			['palette', I.cmd, 'Command palette', MOD + ' P'],
			['switcher', I.search, 'Quick switcher', MOD + ' O'],
			['settings', I.gear, 'Settings', MOD + ' ,'],
			['graph', I.graph, 'Graph', MOD + ' G'],
		];
		h.innerHTML = btns.map(b => `<button class="hint-btn" data-scene="${b[0]}"><span style="width:15px;height:15px;display:grid">${b[1]}</span>${b[2]} ${K(b[3])}</button>`).join('')
			+ `<button class="hint-btn" data-ctx="1"><span style="width:15px;height:15px;display:grid">${I.copy}</span>Right-click editor</button>`;
		h.querySelectorAll('[data-scene]').forEach(b => b.addEventListener('click', () => window.gbScene(b.dataset.scene)));
		return h;
	}

	function settingsHTML() {
		const tab = (i, t, active) => `<div class="set-tab ${active ? 'active' : ''}">${i}<span>${t}</span></div>`;
		const item = (name, desc, control) => `<div class="set-item"><div class="set-item-info"><div class="set-item-name">${name}</div><div class="set-item-desc">${desc}</div></div><div class="set-control">${control}</div></div>`;
		const select = (opts) => `<select class="ctl-select">${opts.map(o => `<option ${o.sel ? 'selected' : ''}>${o.t}</option>`).join('')}</select>`;
		const toggle = (on) => `<div class="ctl-toggle ${on ? 'on' : ''}"></div>`;
		const swatches = ['#fe8019', '#fabd2f', '#8ec07c', '#83a598', '#d3869b', '#b8bb26', '#fb4934'];
		return `
			<div class="set-side">
				<input class="set-search" placeholder="Search settings\u2026">
				<div class="set-group-label">Options</div>
				${tab(I.gear, 'General')}${tab(I.pencil, 'Editor')}${tab(I.monitor, 'Appearance', true)}${tab(I.hotkey, 'Hotkeys')}
				<div class="set-group-label">Community</div>
				${tab(I.plug, 'Community plugins')}${tab(I.palette, 'Style Settings')}
			</div>
			<div class="set-main">
				<div class="set-h">Appearance</div>
				<div class="set-sub">Customize how Obsidian looks. Theme: <b style="color:var(--gb-accent)">Gruvbox Cozy</b></div>
				${item('Base color scheme', 'Choose Obsidian\u2019s color scheme.', select([{ t: 'Dark', sel: true }, { t: 'Light' }, { t: 'Adapt to system' }]))}
				${item('Theme', 'Change the appearance of your vault.', select([{ t: 'Gruvbox Cozy', sel: true }, { t: 'Default' }, { t: 'Minimal' }]))}
				${item('Accent color', 'Highlight color for interactive elements.', `<div class="ctl-swatches">${swatches.map((c, i) => `<span class="ctl-swatch ${i === 0 ? 'sel' : ''}" style="background:${c}"></span>`).join('')}</div>`)}
				${item('Font size', 'Base text size for reading and editing.', `<div class="ctl-slider" style="margin:4px 0"><div class="fill" style="width:46%"></div><div class="knob" style="left:46%"></div></div>`)}
				${item('Colored headings', 'Tint H1\u2013H6 with the palette.', toggle(true))}
				${item('Translucent window', 'Make the app background translucent.', toggle(false))}
				${item('Show inline title', 'Display the note title above the editor.', toggle(true))}
			</div>`;
	}

	function buildGraph() {
		const g = el('div', 'graph-overlay');
		const nodes = [
			{ x: 400, y: 250, r: 13, c: 'focus', l: 'retro-groove' },
			{ x: 250, y: 150, r: 8, l: 'palette' },
			{ x: 560, y: 160, r: 8, l: 'install' },
			{ x: 200, y: 330, r: 7, l: 'README' },
			{ x: 600, y: 350, r: 7, l: '2026-06-03' },
			{ x: 410, y: 410, r: 6, l: 'quick capture' },
			{ x: 320, y: 90, r: 9, c: 'tag', l: '#theme' },
			{ x: 540, y: 280, r: 9, c: 'tag', l: '#aesthetic' },
		];
		const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [1, 6], [2, 7]];
		const E = edges.map(([a, b]) => `<line class="g-edge" x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`).join('');
		const N = nodes.map(n => `<circle class="g-node ${n.c || ''}" cx="${n.x}" cy="${n.y}" r="${n.r}"/><text class="g-label" x="${n.x}" y="${n.y + n.r + 13}">${n.l}</text>`).join('');
		g.innerHTML =
			`<div class="g-controls"><div class="gc-title">Graph view</div>
				<div class="gc-row"><span style="width:10px;height:10px;border-radius:50%;background:var(--gb-accent)"></span>Current note</div>
				<div class="gc-row"><span style="width:10px;height:10px;border-radius:50%;background:var(--gb-fg3)"></span>Linked notes</div>
				<div class="gc-row"><span style="width:10px;height:10px;border-radius:50%;background:var(--gb-aqua)"></span>Tags</div>
			 </div>
			 <div class="g-close" onclick="gbCloseOverlays()">${I.eye}Close graph ${K('esc')}</div>
			 <svg class="g-canvas" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">${E}${N}</svg>`;
		return g;
	}
})();
