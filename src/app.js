const cases = {
  biopsy: {
    repository: 'https://github.com/Danieldotcomcoder/biopsy',
    category: 'AI SYSTEMS TOOLING / NEAR COMPLETION', title: 'biopsy',
    lead: 'A learning-first Rust CLI for understanding neural-network files from their bytes, rather than treating a checkpoint as a black box.',
    problem: 'Model files encode shapes, numeric formats, quantization blocks, and millions of weights. Inspecting their structure, detecting suspicious values, and comparing checkpoints requires careful parsing and numerically reliable computation.',
    decisions: [
      'Implement safetensors and GGUF parsers by hand, with checked arithmetic, bounded reads, alignment validation, and explicit rejection of unsupported formats. Memory-map stable files; inspect metadata without reading weights.',
      'Decode F32, F16, BF16, Q8_0, and Q4_0 in reusable 4,096-value buffers. Schedule work with Rayon and merge summaries in a fixed order for deterministic results across thread counts within each backend.',
      'Compare matching tensors using RMSE, relative L2 change, cosine similarity, and non-finite counts. Keep health thresholds explicit: a warning invites investigation rather than proving a defect.',
      'Gate AVX2 kernels behind runtime CPU-feature checks, retain portable scalar fallbacks, and compare correctness before timing. Use independent readers to cross-check real model files.'
    ],
    evidence: 'The README reports all six implementation milestones complete, exhaustive checks of all 65,536 F16 patterns, and real-file decoder cross-checks against llama.cpp’s gguf-py and NumPy. On an Intel i7-10870H, its documented 16 Mi-value benchmark reports F16 decoding at 9.79 ms scalar versus 1.86 ms AVX2 (5.3×). These are project-reported measurements, not benchmarks rerun for this portfolio.',
    limitation: 'The project is near completion. Numeric decoding currently covers five formats; other recognized types may be inspected but not decoded. Cross-format tensor naming and weight-layout differences limit direct diffs. Health checks are heuristics, and scalar versus SIMD reductions use different addition orders, so their sums are compared with a tolerance rather than expected to be bit-identical.',
    next: 'Finish the remaining release work and preserve a reproducible verification record across supported formats, scalar and SIMD backends, and representative real checkpoints.',
    sources: ['biopsy/README.md']
  },
  ops: {
    repository: 'https://github.com/Danieldotcomcoder/AIOperationsAgent',
    category: 'APPLIED AI / LOCAL IMPLEMENTATION', title: 'OpsPilot',
    lead: 'An operations agent that can investigate and recommend—but needs a human to authorize a write.',
    problem: 'Shipment exceptions need context from orders, policies, and operational records. The engineering challenge is to make every conclusion traceable and every proposed action safe to review.',
    decisions: [
      'Tenant context is derived server-side and enforced in queries and composite foreign keys. Colliding order numbers exercise the isolation boundary.',
      'The investigation is bounded to 3 model turns, 6 tool calls, and 90 seconds. Factual claims must reference evidence IDs that the run actually received.',
      'Immutable proposals bind approval to a payload hash, source record version, and expiry. Execution uses a transactional outbox, deterministic idempotency keys, and reconciliation after uncertain outcomes.'
    ],
    evidence: 'The project documentation reports end-to-end local approval and simulated ERP execution, including duplicate-delivery recovery and worker-kill scenarios. The handoff records 143 deterministic tests passing, with fake environment overrides; this is not proof of live model quality.',
    limitation: 'Synthetic data and a simulated ERP boundary. Live-provider, semantic retrieval, and human quality gates remain incomplete. Five distinct live investigation cases produced structured results before provider availability blocked the batch; those outputs are not human-approved findings.',
    next: 'Complete a reviewed retrieval corpus and labels, then run and human-grade the live evaluation. Demonstrate quality and failure behavior before describing the system as production-ready.',
    sources: ['AIOperationsAgent/README.md', 'AIOperationsAgent/docs/HANDOFF.md']
  },
  shadow: {
    category: 'LLM EVALUATION / PILOT PENDING', title: 'Shadow Twins',
    lead: 'A compact spatial task with a strict validator and an independently verifiable answer ceiling.',
    problem: 'An LLM receives a text description of a 4 × 4 × 4 voxel object. It may relocate at most three cubes while preserving all three orthographic shadows and keeping the solid connected. The objective is to change tunnel-entrance connectivity.',
    decisions: [
      'Score valid answers as 100 × v / v*, where v* is exhaustively certified. No LLM judge or renderer determines the result.',
      'Use frozen, hashed instance packs and an independent verifier. Separate ranked, practice, and development instances.',
      'Report validity and conditional quality alongside the headline score. Compare models with paired instance-level analysis and stratified, clustered bootstrap intervals.'
    ],
    evidence: 'The documented system includes an exact solver, certificate verifier, durable run worker, provider adapters, provenance exports, and React/Three.js inspection. The ranked pack contains 30 instances across three tiers. Mock dry runs exercise the tooling only.',
    limitation: 'The documented pilot has not run; there are no LLM results to report. Benchmark novelty is unconfirmed. Public instances may enter training data, and results on this admitted instance population would not establish general spatial ability.',
    next: 'Run the prespecified small-versus-large model pilot on the frozen pack. Publish validity, score intervals, baselines, failure categories, latency, and cost together.',
    sources: ['llmbenchmarks/README.md', 'llmbenchmarks/docs/research/PILOT_REPORT.md', 'llmbenchmarks/docs/research/STUDY_PROTOCOL.md']
  },
  domain: {
    repository: 'https://github.com/Danieldotcomcoder/domain-shift-forgettting',
    category: 'CONTINUAL LEARNING / SCREENING STUDIES REPORTED', title: 'Domain-Shift Forgetting',
    lead: 'Does gradually switching off internal normalization cause more forgetting after a training-domain shift?',
    problem: 'Two prespecified screening studies compare internal RMSNorm and Taper-minus, using shared training prefixes, paired seeds, held-out development data, and explicit decision rules.',
    decisions: ['Study 1 compares web-to-Python against continued-web controls on seeds 101–103.', 'Study 2 tests a separately specified Chinese-domain shift and repeats the Python comparison on three fresh seeds.', 'Prespecify endpoints and guardrails, separate exploratory analyses from planned contrasts, and keep reserved test data sealed.'],
    evidence: 'The current README reports Study 1 mean D = −0.0223 nats/token and a STOP — SMALL OBSERVED EFFECT decision. The fresh-seed Python replication reports +0.0093 with the same decision; the Chinese shift reports −0.0325 in the opposite direction to the hypothesis. These are project-reported screening outcomes, not an independent reproduction.',
    limitation: 'No study established the predicted excess forgetting, and none established equivalence within ±0.015 nats/token. Seed variability, development-only evaluation, model scale, and domain choice limit the conclusions. A negative contrast does not establish a general protective effect.',
    next: 'Use the documented paper, protocols, and run records to assess the scope of the screening result before defining a separate follow-up study.',
    sources: ['domain-shift-forgetting/README.md', 'domain-shift-forgetting/paper/main.pdf']
  },
  f1: {
    repository: 'https://github.com/Danieldotcomcoder/fastpitstop',
    category: 'REAL-TIME SYSTEMS / BETA', title: 'FastPitStop',
    lead: 'Race analytics and AI narration that respect the information available on the viewer’s delayed broadcast.',
    problem: 'A second-screen dashboard can spoil a race by showing data ahead of the broadcast. Predictions and explanations must obey the same time boundary as timing values, radio, and car positions.',
    decisions: [
      'Normalize live timing, recorded replay, and historical data into one event pipeline. Deterministic analytics make historical backtesting possible.',
      'Apply one Delay Sync gate to every output. Make evidence time no later than viewer time a system invariant.',
      'Gather evidence before asking the language model to narrate. Validate citations and abstain when no clear cause is supported. Display confidence and calibration limits with derived values.'
    ],
    evidence: 'The README reports an undercut backtest on 10 held-out 2025 races: 85.7% accuracy for high-confidence calls and 67.4% for low-confidence calls. It also documents pit-loss calibration from 410 green-flag 2024 stops. These are project-reported results, not a new independent verification.',
    limitation: 'Live polling still needs validation during an actual session. Live car positions are estimated from lap timing; several analytics parameters remain provisional. The radio interface is hidden until a full transcribed season is loaded.',
    next: 'Validate the live-session path, expand calibration coverage, and continue checking that confidence labels track observed accuracy.',
    sources: ['f1dashboard/README.md'],
    link: 'https://fastpitstop.online'
  }
};
const dialog = document.querySelector('#case-dialog');
const content = document.querySelector('#case-content');
let lastTrigger;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const item = cases[button.dataset.case];
  lastTrigger = button;
  content.innerHTML = `<div class="eyebrow">${item.category}</div><h2 id="case-title">${item.title}</h2><p class="lead">${item.lead}</p><h3>The problem</h3><p>${item.problem}</p><h3>Engineering & research decisions</h3><ul>${item.decisions.map(s => `<li>${s}</li>`).join('')}</ul><h3>What the documentation establishes</h3><p>${item.evidence}</p><div class="case-note"><strong>Current limits</strong><p>${item.limitation}</p></div><h3>The next evidence milestone</h3><p>${item.next}</p>${item.link ? `<p style="margin-top:24px"><a class="button dark" href="${item.link}" target="_blank" rel="noopener noreferrer">Visit the beta</a></p>` : ''}${item.repository ? `<p class="case-repository"><a class="text-link" href="${item.repository}" target="_blank" rel="noopener noreferrer">View source on GitHub</a></p>` : ''}<div class="source-note">Source notes · Project documentation reviewed October 2026${item.sources.map(s => `<span>${s}</span>`).join('')}</div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });

// The project index progressively enhances the complete, readable HTML collection.
const projectItems = [...document.querySelectorAll('.project[data-category]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectSearch = document.querySelector('#project-search');
const resultCount = document.querySelector('#result-count');
let selectedCategory = 'all';
const projectSearchText = new Map(projectItems.map(project => [project, project.querySelector('.project-body').textContent.toLowerCase()]));
function updateProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  let visible = 0;
  for (const project of projectItems) {
    const matches = (selectedCategory === 'all' || project.dataset.category === selectedCategory) && projectSearchText.get(project).includes(query);
    project.hidden = !matches;
    if (matches) visible++;
  }
  resultCount.textContent = `${String(visible).padStart(2, '0')} / ${String(projectItems.length).padStart(2, '0')} projects${query ? ' matching your search' : ''}`;
  document.querySelector('.empty-state').hidden = visible !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  selectedCategory = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateProjects();
}));
projectSearch.addEventListener('input', updateProjects);
document.querySelector('[data-filter="all"] span').textContent = String(projectItems.length).padStart(2, '0');
document.querySelector('.work-tools').hidden = false;
resultCount.hidden = false;
updateProjects();

const imageDialog = document.querySelector('#image-dialog');
let lastImageTrigger;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  lastImageTrigger = button;
  document.querySelector('#image-title').textContent = button.dataset.caption;
  const expanded = document.querySelector('#expanded-image');
  expanded.src = button.dataset.image;
  expanded.alt = button.querySelector('img').alt;
  imageDialog.showModal();
  imageDialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastImageTrigger?.focus(); });
imageDialog.addEventListener('click', event => { if(event.target === imageDialog) { const r=imageDialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) imageDialog.close(); } });
document.querySelectorAll('.hero-window').forEach(link => link.addEventListener('click', () => {
  selectedCategory = 'all';
  projectSearch.value = '';
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  updateProjects();
}));
document.querySelector('.header nav a[href="#work"] span').textContent = String(projectItems.length).padStart(2,'0');
document.querySelector('.header nav a[href="#research"] span').textContent = String(document.querySelectorAll('.idea').length).padStart(2,'0');
