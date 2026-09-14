import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock3,
  Database,
  Layers,
  MessageSquare,
  Radio,
  Sparkles,
  Tag,
  Target,
  Users,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useLessonAudio } from '../../shared/useLessonAudio';
import './styles.css';

import hookArt from './assets/illustrations/hook-package-tracker.png';
import hookModalArt from './assets/illustrations/modal-tracking-queue.png';
import costArt from './assets/illustrations/cost-twofold-chaos.png';
import costModalArt from './assets/illustrations/modal-unapproved-work.png';
import disciplinesArt from './assets/illustrations/disciplines-four-pillars.png';
import agileArt from './assets/illustrations/agile-backlog-board.png';
import agileModalArt from './assets/illustrations/modal-agile-prioritization.png';
import examArt from './assets/illustrations/exam-mirrored-timeline.png';

// Custom 4-discipline modal illustrations
import discSourceArt from './assets/illustrations/discipline-single-source.png';
import discRadiatorArt from './assets/illustrations/discipline-visible-radiators.png';
import discRequesterArt from './assets/illustrations/discipline-direct-requester.png';
import discBriefingsArt from './assets/illustrations/discipline-stakeholder-briefings.png';

const tabs = [
  'The tracking principle',
  'Cost of poor visibility',
  'Four disciplines',
  'Agile backlog board',
  'Exam lens'
];

const disciplines = [
  {
    title: 'A Single Source of Truth',
    tag: 'DISCIPLINE 01',
    num: '01',
    text: 'Every active change request has a unique identifier and a current status tracked in a central tool everyone can see.',
    detail: 'Every active change request has a unique identifier and a current status — proposed, under review, approved, rejected, deferred, or implemented — tracked in a tool everyone can actually see. When requests live in personal inboxes, private chats, or separate spreadsheets, confusion reigns and teams build obsolete features.',
    icon: Tag,
    image: discSourceArt
  },
  {
    title: 'Visible Status Updates',
    tag: 'DISCIPLINE 02',
    num: '02',
    text: 'Change status appears in regular project reports and on radiators: dashboards, project logs, or team boards.',
    detail: 'Change status appears in regular project reports and on information radiators: dashboards, change logs on the project site, or a dedicated column on the team’s board. By keeping updates visible, stakeholders stay informed proactively without chasing down project managers.',
    icon: Radio,
    image: discRadiatorArt
  },
  {
    title: 'Direct Requester Communication',
    tag: 'DISCIPLINE 03',
    num: '03',
    text: 'The person who raised the change is told the decision and reasoning directly, never left to guess.',
    detail: 'The person who raised the change is told the decision and the reasoning behind it — not left to find out by accident, or to notice it only because someone else mentioned it in passing. Direct, respectful communication preserves trust and encourages continuous high-quality input.',
    icon: MessageSquare,
    image: discRequesterArt
  },
  {
    title: 'Stakeholder Briefings Before Decision',
    tag: 'DISCIPLINE 04',
    num: '04',
    text: 'For changes materially affecting cost, schedule, or scope, key stakeholders hear proposals before final votes.',
    detail: 'For changes that materially affect cost, schedule, or scope, key stakeholders hear about the proposal and the recommendation before the formal decision is communicated. This alignment phase prevents blindsiding influential partners and minimizes escalations.',
    icon: Users,
    image: discBriefingsArt
  }
];

const reveals = {
  hook: {
    image: hookModalArt,
    title: 'Change requests need the exact same visibility.',
    text: "Change requests need the exact same visibility as an online delivery. They live in a queue between 'raised' and 'decided,' and stakeholders need to know where their request sits at any moment — not by chasing someone down, but by checking a status that's actually kept current."
  },
  cost: {
    image: costModalArt,
    title: 'When nobody can see where a request stands, cost shows up in two ways.',
    text: 'The cost of poor change-status communication is twofold: stakeholders push the same request through multiple channels, because the one they already used seemed to disappear into silence — and the team starts working on items they think are approved but are not, because nobody made the actual status visible in the first place.'
  },
  agile: {
    image: agileModalArt,
    title: 'In agile environments, the backlog is the change-status board.',
    text: 'The backlog is the change-status board. New requests sit in the backlog with a priority, and reprioritization is visible at every iteration planning meeting. The discipline is the same as anywhere else: stakeholders should never have to guess where their request stands — only the mechanism changes.'
  },
  exam: {
    image: examArt,
    title: 'Know where every change sits between raised and decided.',
    text: 'Change requests live in a queue between raised and decided, and poor status communication costs twice: duplicate requests pushed through multiple channels, and teams building things nobody actually approved. Four disciplines fix this: a single source of truth with a unique ID and status, visible status updates on reports and radiators, direct communication with the requester, and stakeholder briefings before material decisions land. In agile environments, the backlog itself is the change-status board — same discipline, different mechanism.',
    bullets: [
      'Six status states: proposed, under review, approved, rejected, deferred, implemented',
      'Poor status visibility costs twice: duplicate requests through multiple channels, and unapproved work getting started',
      'Four disciplines: single source of truth, visible status updates, direct communication with the requester, pre-decision stakeholder briefings for material changes',
      'In agile, the backlog and its priority position at iteration planning is the change-status board — no separate mechanism needed'
    ]
  }
};

const quizzes = {
  disciplines: {
    question:
      'Scenario: A change request is formally rejected in a change control board meeting. The requester is not personally told the outcome, and only finds out weeks later when they notice the item has disappeared from the change log. What discipline does this scenario violate?',
    answers: [
      'A single source of truth, since the change log did eventually reflect the correct status',
      'Direct communication with the requester — the person who raised the change should have been told the decision and the reasoning directly, not left to discover it on their own',
      'Stakeholder briefings before the decision lands, since this change didn’t materially affect cost, schedule, or scope',
      'Visible status updates, since the change log is a valid information radiator'
    ],
    correct: 1,
    good: "Correct! The change log being accurate isn't the issue here — the requester specifically needed to be told the decision and reasoning directly, not left to stumble onto it later by checking a log on their own.",
    bad: "Reconsider — the single source of truth and the visible status update both technically worked here; the actual gap is that the one person most invested in the outcome was never personally informed."
  },
  agile: {
    question:
      "Scenario: A stakeholder on an agile project asks the project manager for a separate, formal change-status report outside the normal backlog process, since they're unsure how to track their request. What is the most appropriate response?",
    answers: [
      'Create the separate report, since agile teams should still maintain traditional change logs alongside the backlog',
      'Tell the stakeholder that change requests aren’t tracked formally in agile environments',
      'Escalate the request to the change control board, since agile projects still require formal boards for every request',
      'Explain that the backlog itself is the change-status board — the request’s position and priority are visible there, and reprioritization is shown at every iteration planning meeting'
    ],
    correct: 3,
    good: 'Correct! In agile environments, the backlog already serves as the change-status board — a separate parallel report would duplicate a system that already provides the same visibility the stakeholder is asking for.',
    bad: 'Reconsider — a separate report duplicates a system that already works; agile projects absolutely do track change requests formally, just through the backlog rather than a change control board process.'
  }
};

function Modal({ data, onClose, onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={data.image} alt="" />
            <h3>{data.title}</h3>
            <div className="modal-copy">
              <p>{data.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <p className="eyebrow">EXAM-RELEVANT ENABLERS TO REMEMBER</p>
            <h3>Six states, four disciplines, and agile equivalence.</h3>
            <ul>
              {data.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {data.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button className="modal-action" onClick={onDone}>
            Mark as read <Check />
          </button>
        )}
      </motion.section>
    </div>,
    document.body
  );
}

function Quiz({ data, onFinish }) {
  const [picked, setPicked] = useState(null);

  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((answer, i) => (
            <button
              key={answer}
              className={picked === i ? (i === data.correct ? 'correct' : 'wrong') : ''}
              onClick={() => setPicked(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {answer}
            </button>
          ))}
        </div>
        {picked !== null && (
          <>
            <p className={`feedback ${picked === data.correct ? 'good' : 'bad'}`}>
              {picked === data.correct ? data.good : data.bad}
            </p>
            <button className="finish-check" onClick={onFinish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function DisciplineModal({ discipline, onClose, onMarkRead }) {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <img className="modal-illustration" src={discipline.image} alt={discipline.title} />
        <h3>{discipline.title}</h3>
        <div className="modal-copy">
          <p>{discipline.detail}</p>
        </div>
        <button
          className="modal-action"
          onClick={() => {
            onMarkRead();
            onClose();
          }}
        >
          Understood & Marked as Read <Check />
        </button>
      </motion.section>
    </div>,
    document.body
  );
}

function CardGridPage({
  eyebrow,
  title,
  lead,
  items,
  read,
  onOpenItem,
  after
}) {
  return (
    <div className="wide-page">
      <div className="header-clean">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>

      <div className="card-grid two">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isRead = read[i];
          return (
            <button
              key={item.title}
              className={`click-card ${isRead ? 'read' : ''}`}
              onClick={() => onOpenItem(i)}
            >
              <span className="card-icon">
                <Icon size={28} />
              </span>
              <strong>{item.title}</strong>
              {isRead ? (
                <Check className="card-arrow check" size={20} />
              ) : (
                <ArrowRight className="card-arrow" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {read.every(Boolean) && after}
    </div>
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(Array(5).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);

  const [activeDisc, setActiveDisc] = useState(null);
  const [discRead, setDiscRead] = useState([false, false, false, false]);

  useLessonAudio(sound);

  const mark = (i) =>
    setDone((values) => values.map((value, index) => (index === i ? true : value)));

  const go = (i) => {
    if (i >= 0 && i < 5 && (i <= page + 1 || done[i - 1])) {
      setPage(i);
    }
  };

  const finishModal = () => {
    const currentModal = modal;
    setModal(null);
    if (currentModal === 'agile') {
      setQuiz('agile');
    } else {
      mark(page);
    }
  };

  const finishQuiz = () => {
    mark(page);
    setQuiz(null);
  };

  let content;

  if (page === 0) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">LESSON 6.2.2 · COMMUNICATE THE STATUS OF PROPOSED CHANGES</p>
          <h1>
            Order tracking for change requests. <span>Where is your package?</span>
          </h1>
          <p className="lead">
            When you order something online, you don't have to call the company to ask where your
            package is. You just check the tracking number — processing, shipped, out for delivery —
            without hunting anyone down.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => setModal('hook')}
          >
            {done[0] ? 'Tracking principle reviewed' : 'Reveal the tracking principle'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={hookArt} alt="" />
      </div>
    );
  }

  if (page === 1) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">THE COST OF POOR STATUS COMMUNICATION</p>
          <h2>When requests disappear into silence.</h2>
          <p className="lead">
            When nobody can see where a request actually stands, the cost shows up in two very
            specific, very expensive ways.
          </p>
          <button
            className="primary-cta"
            disabled={done[1]}
            onClick={() => setModal('cost')}
          >
            {done[1] ? 'Twofold cost reviewed' : 'Reveal the two costs'} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={costArt} alt="" />
      </div>
    );
  }

  if (page === 2) {
    content = (
      <CardGridPage
        eyebrow="FOUR PRACTICAL DISCIPLINES"
        title="Four disciplines that eliminate the guesswork."
        lead="Four basic disciplines keep everyone able to see exactly where a proposed change stands. Click each card to inspect the discipline and its practical application."
        items={disciplines}
        read={discRead}
        onOpenItem={(idx) => {
          setActiveDisc(idx);
          setDiscRead((values) => values.map((v, j) => (j === idx ? true : v)));
        }}
        after={
          <button
            className="knowledge-cta centered"
            disabled={done[2]}
            onClick={() => !done[2] && setQuiz('disciplines')}
          >
            {done[2] ? (
              <><Check /> Knowledge check completed</>
            ) : (
              <><Target /> Start knowledge check <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 3) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">AGILE: THE BACKLOG IS THE STATUS BOARD</p>
          <h2>Same discipline. Different mechanism.</h2>
          <p className="lead">
            In agile environments, the same discipline lives inside a tool the team is already using
            every day.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => setModal('agile')}
          >
            {done[3] ? 'Agile mechanism reviewed' : 'Reveal the agile mechanism'} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={agileArt} alt="" />
      </div>
    );
  }

  if (page === 4) {
    content = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={examArt} alt="" />
        </div>
        <div>
          <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
          <h2>Back to that tracking number one more time —</h2>
          <p className="lead">
            because nobody should ever have to call and ask where their request actually is.
          </p>
          <button
            className="primary-cta"
            disabled={done[4]}
            onClick={() => setModal('exam')}
          >
            {done[4] ? 'Exam lens reviewed' : 'Reveal the exam lens'} <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 5 ? 'done' : i === 5 ? 'active' : ''}`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound((v) => !v)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {page + 1} OF 5</p>
              <div>
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`${done[i] ? 'done' : ''} ${page === i ? 'active' : ''}`}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{content}</div>
            {done[page] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!page}
                onClick={() => go(page - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[page] ? 'unlocked' : ''}`}
                disabled={!done[page]}
                onClick={() => page < 4 && go(page + 1)}
              >
                {page === 4 ? 'Continue to next lesson' : 'Continue'} <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal data={reveals[modal]} onClose={() => setModal(null)} onDone={finishModal} />
      )}
      {activeDisc !== null && (
        <DisciplineModal
          discipline={disciplines[activeDisc]}
          onClose={() => setActiveDisc(null)}
          onMarkRead={() => {
            setDiscRead((values) => values.map((v, j) => (j === activeDisc ? true : v)));
            setActiveDisc(null);
          }}
        />
      )}
      {quiz && <Quiz data={quizzes[quiz]} onFinish={finishQuiz} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
