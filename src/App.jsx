import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  RefreshCcw,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  Zap,
} from 'lucide-react';

const filterOptions = [
  { key: 'today', label: 'Hoje' },
  { key: '7d', label: '7 dias' },
  { key: '30d', label: '30 dias' },
  { key: '3m', label: 'Últimos 3 meses' },
];

const periodData = {
  today: {
    label: 'Hoje',
    updatedAt: 'há 8 min',
    resolvedRate: '91,8%',
    criticalQueue: 18,
    nps: 69,
    alerts: 3,
    kpis: {
      tickets: '436', sla: '92,6%', csat: '4,48', tma: '7m 08s', pending: '74', recurrence: '9,1%',
      ticketChange: '+6,8%', slaChange: '-1,2 p.p.', csatChange: '-0,06', tmaChange: '+22s', pendingChange: '+14,2%', recurrenceChange: '+0,8 p.p.',
    },
    timeline: [
      { day: '08h', atendimentos: 38, resolvidos: 31 },
      { day: '10h', atendimentos: 62, resolvidos: 55 },
      { day: '12h', atendimentos: 71, resolvidos: 63 },
      { day: '14h', atendimentos: 88, resolvidos: 77 },
      { day: '16h', atendimentos: 96, resolvidos: 89 },
      { day: '18h', atendimentos: 81, resolvidos: 72 },
    ],
    reasons: [
      { name: 'Instabilidade de conexão', value: 34, color: '#0ea5e9' },
      { name: 'Lentidão de internet', value: 24, color: '#f59e0b' },
      { name: 'Configuração de equipamento', value: 19, color: '#14b8a6' },
      { name: 'Acesso indisponível', value: 14, color: '#6366f1' },
      { name: 'Dúvidas técnicas', value: 9, color: '#f43f5e' },
    ],
    channels: [
      { name: 'WhatsApp', value: 49, color: '#22c55e' },
      { name: 'Ligações', value: 29, color: '#0ea5e9' },
      { name: 'E-mail', value: 12, color: '#6366f1' },
      { name: 'Chat', value: 10, color: '#f59e0b' },
    ],
    analystSla: [
      { name: 'Ana', sla: 96 }, { name: 'Bruno', sla: 94 }, { name: 'Carla', sla: 92 }, { name: 'Diego', sla: 88 }, { name: 'Lia', sla: 95 }, { name: 'Rafa', sla: 91 },
    ],
    analysts: [
      { name: 'Ana Martins', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 68, sla: '96%', csat: '4,6', tma: '6m 11s', status: 'Excelente' },
      { name: 'Bruno Costa', operation: 'Suporte técnico', channel: 'Ligações', tickets: 74, sla: '94%', csat: '4,5', tma: '6m 42s', status: 'Consistente' },
      { name: 'Carla Souza', operation: 'Suporte técnico', channel: 'E-mail', tickets: 55, sla: '92%', csat: '4,4', tma: '7m 05s', status: 'Atenção leve' },
      { name: 'Diego Lima', operation: 'Suporte técnico', channel: 'Chat', tickets: 61, sla: '88%', csat: '4,1', tma: '8m 03s', status: 'Priorizar fila' },
      { name: 'Lia Rocha', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 63, sla: '95%', csat: '4,7', tma: '6m 20s', status: 'Excelente' },
    ],
    insight: 'Hoje a operação está mais pressionada que a média, principalmente por instabilidade de conexão e picos em WhatsApp. A fila técnica precisa de reforço imediato no período da tarde.',
  },
  '7d': {
    label: 'Últimos 7 dias',
    updatedAt: 'há 12 min',
    resolvedRate: '93,1%',
    criticalQueue: 36,
    nps: 70,
    alerts: 5,
    kpis: {
      tickets: '2.146', sla: '93,7%', csat: '4,54', tma: '6m 56s', pending: '186', recurrence: '8,6%',
      ticketChange: '+9,2%', slaChange: '+0,7 p.p.', csatChange: '+0,05', tmaChange: '-14s', pendingChange: '-4,3%', recurrenceChange: '-0,3 p.p.',
    },
    timeline: [
      { day: 'Seg', atendimentos: 286, resolvidos: 263 },
      { day: 'Ter', atendimentos: 314, resolvidos: 296 },
      { day: 'Qua', atendimentos: 298, resolvidos: 279 },
      { day: 'Qui', atendimentos: 342, resolvidos: 321 },
      { day: 'Sex', atendimentos: 366, resolvidos: 342 },
      { day: 'Sáb', atendimentos: 292, resolvidos: 269 },
      { day: 'Dom', atendimentos: 248, resolvidos: 227 },
    ],
    reasons: [
      { name: 'Instabilidade de conexão', value: 31, color: '#0ea5e9' },
      { name: 'Configuração de equipamento', value: 22, color: '#14b8a6' },
      { name: 'Lentidão de internet', value: 21, color: '#f59e0b' },
      { name: 'Acesso indisponível', value: 15, color: '#6366f1' },
      { name: 'Dúvidas técnicas', value: 11, color: '#f43f5e' },
    ],
    channels: [
      { name: 'WhatsApp', value: 47, color: '#22c55e' },
      { name: 'Ligações', value: 28, color: '#0ea5e9' },
      { name: 'E-mail', value: 14, color: '#6366f1' },
      { name: 'Chat', value: 11, color: '#f59e0b' },
    ],
    analystSla: [
      { name: 'Ana', sla: 97 }, { name: 'Bruno', sla: 95 }, { name: 'Carla', sla: 93 }, { name: 'Diego', sla: 90 }, { name: 'Lia', sla: 96 }, { name: 'Rafa', sla: 92 },
    ],
    analysts: [
      { name: 'Ana Martins', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 342, sla: '97%', csat: '4,7', tma: '6m 02s', status: 'Excelente' },
      { name: 'Bruno Costa', operation: 'Suporte técnico', channel: 'Ligações', tickets: 381, sla: '95%', csat: '4,6', tma: '6m 29s', status: 'Consistente' },
      { name: 'Carla Souza', operation: 'Suporte técnico', channel: 'E-mail', tickets: 297, sla: '93%', csat: '4,5', tma: '6m 58s', status: 'Atenção leve' },
      { name: 'Diego Lima', operation: 'Suporte técnico', channel: 'Chat', tickets: 318, sla: '90%', csat: '4,2', tma: '7m 49s', status: 'Priorizar fila' },
      { name: 'Lia Rocha', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 329, sla: '96%', csat: '4,7', tma: '6m 15s', status: 'Excelente' },
    ],
    insight: 'Nos últimos 7 dias, o SLA ficou próximo da meta. A atenção principal está em Diego e na fila de chat, onde o TMA segue acima da média.',
  },
  '30d': {
    label: 'Últimos 30 dias',
    updatedAt: 'há 8 min',
    resolvedRate: '92,4%',
    criticalQueue: 42,
    nps: 71,
    alerts: 6,
    kpis: {
      tickets: '8.742', sla: '94,8%', csat: '4,62', tma: '6m 42s', pending: '318', recurrence: '7,9%',
      ticketChange: '+12,4%', slaChange: '+3,1 p.p.', csatChange: '+0,18', tmaChange: '-38s', pendingChange: '-9,6%', recurrenceChange: '-1,4 p.p.',
    },
    timeline: [
      { day: 'Sem 1', atendimentos: 1986, resolvidos: 1834 },
      { day: 'Sem 2', atendimentos: 2140, resolvidos: 2012 },
      { day: 'Sem 3', atendimentos: 2215, resolvidos: 2076 },
      { day: 'Sem 4', atendimentos: 2401, resolvidos: 2217 },
    ],
    reasons: [
      { name: 'Instabilidade de conexão', value: 29, color: '#0ea5e9' },
      { name: 'Configuração de equipamento', value: 23, color: '#14b8a6' },
      { name: 'Lentidão de internet', value: 21, color: '#f59e0b' },
      { name: 'Acesso indisponível', value: 16, color: '#6366f1' },
      { name: 'Dúvidas técnicas', value: 11, color: '#f43f5e' },
    ],
    channels: [
      { name: 'WhatsApp', value: 46, color: '#22c55e' },
      { name: 'Ligações', value: 27, color: '#0ea5e9' },
      { name: 'E-mail', value: 16, color: '#6366f1' },
      { name: 'Chat', value: 11, color: '#f59e0b' },
    ],
    analystSla: [
      { name: 'Ana', sla: 98 }, { name: 'Bruno', sla: 96 }, { name: 'Carla', sla: 94 }, { name: 'Diego', sla: 91 }, { name: 'Lia', sla: 97 }, { name: 'Rafa', sla: 93 },
    ],
    analysts: [
      { name: 'Ana Martins', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 684, sla: '98%', csat: '4,8', tma: '5m 58s', status: 'Excelente' },
      { name: 'Bruno Costa', operation: 'Suporte técnico', channel: 'Ligações', tickets: 731, sla: '96%', csat: '4,6', tma: '6m 21s', status: 'Consistente' },
      { name: 'Carla Souza', operation: 'Suporte técnico', channel: 'E-mail', tickets: 612, sla: '94%', csat: '4,5', tma: '6m 44s', status: 'Atenção leve' },
      { name: 'Diego Lima', operation: 'Suporte técnico', channel: 'Chat', tickets: 589, sla: '91%', csat: '4,2', tma: '7m 36s', status: 'Priorizar fila' },
      { name: 'Lia Rocha', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 658, sla: '97%', csat: '4,7', tma: '6m 08s', status: 'Excelente' },
    ],
    insight: 'Nos últimos 30 dias, a operação está saudável, com SLA de 94,8% e CSAT de 4,62. WhatsApp lidera a demanda e a principal alavanca é reduzir reincidência em instabilidade.',
  },
  '3m': {
    label: 'Últimos 3 meses',
    updatedAt: 'há 15 min',
    resolvedRate: '93,6%',
    criticalQueue: 64,
    nps: 73,
    alerts: 8,
    kpis: {
      tickets: '25.480', sla: '95,2%', csat: '4,66', tma: '6m 31s', pending: '496', recurrence: '7,2%',
      ticketChange: '+18,9%', slaChange: '+2,7 p.p.', csatChange: '+0,22', tmaChange: '-51s', pendingChange: '-12,8%', recurrenceChange: '-1,9 p.p.',
    },
    timeline: [
      { day: 'Mai', atendimentos: 7960, resolvidos: 7418 },
      { day: 'Jun', atendimentos: 8778, resolvidos: 8231 },
      { day: 'Jul', atendimentos: 8742, resolvidos: 8110 },
    ],
    reasons: [
      { name: 'Instabilidade de conexão', value: 27, color: '#0ea5e9' },
      { name: 'Configuração de equipamento', value: 24, color: '#14b8a6' },
      { name: 'Lentidão de internet', value: 20, color: '#f59e0b' },
      { name: 'Acesso indisponível', value: 17, color: '#6366f1' },
      { name: 'Dúvidas técnicas', value: 12, color: '#f43f5e' },
    ],
    channels: [
      { name: 'WhatsApp', value: 44, color: '#22c55e' },
      { name: 'Ligações', value: 29, color: '#0ea5e9' },
      { name: 'E-mail', value: 15, color: '#6366f1' },
      { name: 'Chat', value: 12, color: '#f59e0b' },
    ],
    analystSla: [
      { name: 'Ana', sla: 98 }, { name: 'Bruno', sla: 97 }, { name: 'Carla', sla: 95 }, { name: 'Diego', sla: 93 }, { name: 'Lia', sla: 98 }, { name: 'Rafa', sla: 94 },
    ],
    analysts: [
      { name: 'Ana Martins', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 2036, sla: '98%', csat: '4,8', tma: '5m 51s', status: 'Excelente' },
      { name: 'Bruno Costa', operation: 'Suporte técnico', channel: 'Ligações', tickets: 2184, sla: '97%', csat: '4,7', tma: '6m 12s', status: 'Excelente' },
      { name: 'Carla Souza', operation: 'Suporte técnico', channel: 'E-mail', tickets: 1842, sla: '95%', csat: '4,6', tma: '6m 32s', status: 'Consistente' },
      { name: 'Diego Lima', operation: 'Suporte técnico', channel: 'Chat', tickets: 1768, sla: '93%', csat: '4,3', tma: '7m 12s', status: 'Atenção leve' },
      { name: 'Lia Rocha', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 1995, sla: '98%', csat: '4,8', tma: '5m 59s', status: 'Excelente' },
    ],
    insight: 'Nos últimos 3 meses, a tendência é positiva: SLA passou de 95%, TMA caiu e reincidência reduziu. O próximo salto deve vir de automação no WhatsApp e padronização de troubleshooting.',
  },
};

const channelIcons = { WhatsApp: MessageCircle, Ligações: PhoneCall, 'E-mail': Mail, Chat: MessageSquareText };

const kpiMeta = [
  { key: 'tickets', label: 'Atendimentos', changeKey: 'ticketChange', helper: 'vs. período anterior', icon: Headphones, tone: 'from-sky-500 to-cyan-400', bg: 'bg-sky-50', text: 'text-sky-700', trend: 'up' },
  { key: 'sla', label: 'SLA', changeKey: 'slaChange', helper: 'dentro do prazo', icon: Target, tone: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-50', text: 'text-emerald-700', trend: 'up' },
  { key: 'csat', label: 'CSAT', changeKey: 'csatChange', helper: 'nota média', icon: CheckCircle2, tone: 'from-teal-500 to-cyan-400', bg: 'bg-teal-50', text: 'text-teal-700', trend: 'up' },
  { key: 'tma', label: 'TMA', changeKey: 'tmaChange', helper: 'tempo médio', icon: Clock3, tone: 'from-amber-500 to-orange-400', bg: 'bg-amber-50', text: 'text-amber-700', trend: 'down' },
  { key: 'pending', label: 'Pendentes', changeKey: 'pendingChange', helper: 'fila atual', icon: AlertCircle, tone: 'from-rose-500 to-pink-400', bg: 'bg-rose-50', text: 'text-rose-700', trend: 'down' },
  { key: 'recurrence', label: 'Reincidência', changeKey: 'recurrenceChange', helper: 'no período', icon: RefreshCcw, tone: 'from-indigo-500 to-violet-400', bg: 'bg-indigo-50', text: 'text-indigo-700', trend: 'down' },
];

function makeKpis(data) {
  return kpiMeta.map((item) => ({ ...item, value: data.kpis[item.key], change: data.kpis[item.changeKey] }));
}

function normalizeText(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildDataAnswer(question, data) {
  const text = normalizeText(question);
  const topChannel = data.channels[0];
  const topReason = data.reasons[0];
  const attention = data.analysts.find((analyst) => analyst.status !== 'Excelente') || data.analysts[0];

  if (!text.trim()) {
    return 'Digite uma pergunta sobre SLA, CSAT, TMA, pendentes, canais ou atendentes para eu consultar os dados fictícios do período selecionado.';
  }

  if (text.includes('whatsapp') || text.includes('ligacao') || text.includes('ligacoes') || text.includes('email') || text.includes('e-mail') || text.includes('chat') || text.includes('canal')) {
    return 'No período ' + data.label + ', o canal com maior volume é ' + topChannel.name + ', com ' + topChannel.value + '% dos atendimentos. A distribuição completa é: WhatsApp ' + data.channels[0].value + '%, ligações ' + data.channels[1].value + '%, e-mail ' + data.channels[2].value + '% e chat ' + data.channels[3].value + '%.';
  }

  if (text.includes('sla')) {
    return 'No período ' + data.label + ', o SLA geral está em ' + data.kpis.sla + '. A meta operacional é 95%. O menor SLA entre os atendentes é de ' + data.analystSla.reduce((low, item) => item.sla < low.sla ? item : low, data.analystSla[0]).name + ', então vale acompanhar redistribuição de fila e complexidade dos casos.';
  }

  if (text.includes('csat') || text.includes('satisfacao') || text.includes('satisfação')) {
    return 'O CSAT médio em ' + data.label + ' está em ' + data.kpis.csat + '. Os melhores resultados aparecem nos atendentes com menor TMA e maior estabilidade de SLA, especialmente Ana e Lia.';
  }

  if (text.includes('tma') || text.includes('tempo')) {
    return 'O TMA do período é ' + data.kpis.tma + '. A leitura operacional é que atendimentos de chat e casos de acesso indisponível tendem a alongar o tempo médio.';
  }

  if (text.includes('pendente') || text.includes('fila')) {
    return 'Existem ' + data.kpis.pending + ' atendimentos pendentes em ' + data.label + '. A fila crítica está em ' + data.criticalQueue + ' casos, com maior atenção para suporte técnico nos horários de pico.';
  }

  if (text.includes('motivo') || text.includes('problema') || text.includes('causa')) {
    return 'O principal motivo em ' + data.label + ' é ' + topReason.name + ', representando ' + topReason.value + '% dos contatos. Os três maiores motivos somam ' + (data.reasons[0].value + data.reasons[1].value + data.reasons[2].value) + '% da demanda técnica.';
  }

  if (text.includes('analista') || text.includes('atendente') || text.includes('quem')) {
    return 'Todos os atendentes são da operação de suporte técnico. O principal ponto de atenção em ' + data.label + ' é ' + attention.name + ', com status "' + attention.status + '", SLA de ' + attention.sla + ' e TMA de ' + attention.tma + '.';
  }

  return 'Resumo de ' + data.label + ': ' + data.kpis.tickets + ' atendimentos, SLA de ' + data.kpis.sla + ', CSAT de ' + data.kpis.csat + ', TMA de ' + data.kpis.tma + ' e principal canal em ' + topChannel.name + '.';
}

function KpiCard({ item }) {
  const Icon = item.icon;
  const TrendIcon = item.trend === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <section className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-panel">
      <div className={'absolute inset-x-0 top-0 h-1 bg-gradient-to-r ' + item.tone} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">{item.value}</h2>
        </div>
        <div className={'grid h-11 w-11 place-items-center rounded-lg ' + item.bg + ' ' + item.text}>
          <Icon size={21} aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 font-semibold text-slate-800 ring-1 ring-slate-100">
          <TrendIcon size={14} aria-hidden="true" />
          {item.change}
        </span>
        <span className="text-slate-500">{item.helper}</span>
      </div>
    </section>
  );
}

function Panel({ title, subtitle, icon: Icon, children, action, className = '' }) {
  return (
    <section className={'rounded-lg border border-slate-200 bg-white shadow-sm ' + className}>
      <div className="flex min-h-16 flex-col justify-between gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-start">
        <div className="flex gap-3">
          {Icon && <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-100"><Icon size={18} aria-hidden="true" /></div>}
          <div>
            <h2 className="text-base font-semibold text-slate-950">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function StatusBadge({ children }) {
  const color = children === 'Excelente' ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : children === 'Priorizar fila' ? 'bg-rose-50 text-rose-700 ring-rose-100' : 'bg-slate-100 text-slate-700 ring-slate-200';
  return <span className={'rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ' + color}>{children}</span>;
}

function PeriodFilters({ activePeriod, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
      {filterOptions.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          className={'h-9 rounded-md px-3 text-sm font-semibold transition ' + (filter.key === activePeriod ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50')}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function ChannelCards({ channels }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {channels.map((channel) => {
        const Icon = channelIcons[channel.name] || MessageSquareText;
        return (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4" key={channel.name}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2"><Icon size={18} style={{ color: channel.color }} aria-hidden="true" /><span className="text-sm font-semibold text-slate-700">{channel.name}</span></div>
              <span className="text-lg font-semibold text-slate-950">{channel.value}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-slate-200"><div className="h-1.5 rounded-full" style={{ width: channel.value + '%', backgroundColor: channel.color }} /></div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activePeriod, setActivePeriod] = useState('30d');
  const [question, setQuestion] = useState('');
  const data = periodData[activePeriod];
  const kpis = makeKpis(data);
  const [answer, setAnswer] = useState('Pergunte sobre SLA, CSAT, canais, pendentes, TMA, motivos ou atendentes para ver uma resposta baseada nos dados fictícios do período selecionado.');

  function changePeriod(period) {
    const nextData = periodData[period];
    setActivePeriod(period);
    setAnswer('Período alterado para ' + nextData.label + '. Os KPIs, gráficos, canais e atendentes foram atualizados com dados fictícios desse recorte.');
  }

  function handleAsk(event) {
    event.preventDefault();
    setAnswer(buildDataAnswer(question, data));
  }

  function handleAiAnalysis() {
    const prompt = 'Qual é o resumo da operação?';
    setQuestion(prompt);
    setAnswer(buildDataAnswer(prompt, data));
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/nlt_telecom_logo.jpg" alt="NLT Telecom" className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">NLT Telecom</p>
              <h1 className="text-xl font-semibold text-slate-950">CX Intelligence</h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <PeriodFilters activePeriod={activePeriod} onChange={changePeriod} />
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><Filter size={17} aria-hidden="true" />Filtros</button>
            <button onClick={handleAiAnalysis} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"><Sparkles size={17} aria-hidden="true" />Gerar análise com IA</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
        <section className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-7 text-white shadow-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/10"><CalendarDays size={15} aria-hidden="true" />Período ativo: {data.label}</div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">Operação de suporte técnico monitorada com dados fictícios por período.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">Acompanhe WhatsApp, ligações, e-mail e chat em recortes de hoje, 7 dias, 30 dias e últimos 3 meses.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Resolvido</p><p className="mt-2 text-2xl font-semibold">{data.resolvedRate}</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Fila crítica</p><p className="mt-2 text-2xl font-semibold">{data.criticalQueue}</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">NPS estimado</p><p className="mt-2 text-2xl font-semibold">{data.nps}</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Alertas</p><p className="mt-2 text-2xl font-semibold">{data.alerts}</p></div>
            </div>
          </div>

          <section className="rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-950 to-sky-950 p-6 text-white shadow-panel">
            <div className="flex items-center justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15"><Bot size={24} aria-hidden="true" /></div><span className="rounded-md bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">IA ativa</span></div>
            <h2 className="mt-5 text-xl font-semibold">Insights da IA</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{data.insight}</p>
            <div className="mt-5 grid gap-3"><div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/10"><p className="text-xs text-slate-300">Principal canal</p><p className="mt-1 font-semibold">{data.channels[0].name} · {data.channels[0].value}%</p></div><div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/10"><p className="text-xs text-slate-300">Maior motivo</p><p className="mt-1 font-semibold">{data.reasons[0].name} · {data.reasons[0].value}%</p></div></div>
          </section>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{kpis.map((item) => <KpiCard item={item} key={item.label} />)}</section>

        <section className="mb-5"><Panel title="Avaliação por canal" subtitle={'Distribuição dos atendimentos de suporte técnico em ' + data.label} icon={MessageCircle}><ChannelCards channels={data.channels} /></Panel></section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <Panel title="Atendimentos por período" subtitle={'Volume recebido e resolvido em ' + data.label} icon={TrendingUp} action={<span className="text-xs font-semibold text-slate-500">Meta: resolver 90%+</span>}>
            <div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.timeline} margin={{ top: 10, right: 18, left: -18, bottom: 0 }}><defs><linearGradient id="ticketFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.28} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} /></linearGradient><linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.22} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)' }} /><Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 16 }} /><Area type="monotone" dataKey="atendimentos" name="Atendimentos" stroke="#0ea5e9" strokeWidth={3} fill="url(#ticketFill)" /><Area type="monotone" dataKey="resolvidos" name="Resolvidos" stroke="#14b8a6" strokeWidth={3} fill="url(#resolvedFill)" /></AreaChart></ResponsiveContainer></div>
          </Panel>

          <Panel title="Motivos de contato" subtitle="Principais demandas técnicas" icon={MessageSquareText}>
            <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.9fr]">
              <div className="h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.reasons} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3}>{data.reasons.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }} formatter={(value) => [value + '%', 'Participação']} /></PieChart></ResponsiveContainer></div>
              <div className="space-y-3">{data.reasons.map((reason) => <div className="rounded-lg border border-slate-100 bg-slate-50 p-3" key={reason.name}><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ backgroundColor: reason.color }} /><span className="text-sm font-medium text-slate-700">{reason.name}</span></div><span className="text-sm font-semibold text-slate-950">{reason.value}%</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-200"><div className="h-1.5 rounded-full" style={{ width: reason.value + '%', backgroundColor: reason.color }} /></div></div>)}</div>
            </div>
          </Panel>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.25fr]">
          <Panel title="SLA por atendente" subtitle="Todos da operação de suporte técnico · meta 95%" icon={UsersRound}><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.analystSla} margin={{ top: 8, right: 14, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis domain={[80, 100]} tickLine={false} axisLine={false} tickFormatter={(value) => value + '%'} /><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }} formatter={(value) => [value + '%', 'SLA']} /><Bar dataKey="sla" radius={[7, 7, 0, 0]} fill="#14b8a6" /></BarChart></ResponsiveContainer></div></Panel>
          <Panel title="Tabela de atendentes" subtitle="Suporte técnico por canal, produtividade, qualidade e tempo médio" icon={UsersRound}><div className="overflow-x-auto"><table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm"><thead><tr className="text-slate-500">{['Atendente', 'Operação', 'Canal', 'Tickets', 'SLA', 'CSAT', 'TMA', 'Status'].map((heading) => <th className="border-b border-slate-200 pb-3 font-semibold" key={heading}>{heading}</th>)}</tr></thead><tbody>{data.analysts.map((analyst) => <tr className="text-slate-700" key={analyst.name}><td className="border-b border-slate-100 py-4 font-semibold text-slate-950">{analyst.name}</td><td className="border-b border-slate-100 py-4">{analyst.operation}</td><td className="border-b border-slate-100 py-4">{analyst.channel}</td><td className="border-b border-slate-100 py-4">{analyst.tickets}</td><td className="border-b border-slate-100 py-4">{analyst.sla}</td><td className="border-b border-slate-100 py-4">{analyst.csat}</td><td className="border-b border-slate-100 py-4">{analyst.tma}</td><td className="border-b border-slate-100 py-4"><StatusBadge>{analyst.status}</StatusBadge></td></tr>)}</tbody></table></div></Panel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel title="Resumo gerado por IA" subtitle="Leitura executiva dos principais sinais" icon={Bot} className="border-indigo-200 shadow-panel"><div className="space-y-5 text-sm leading-6 text-slate-600"><div className="rounded-lg bg-indigo-50 p-5 ring-1 ring-indigo-100"><div className="mb-3 flex items-center gap-2 text-indigo-700"><Zap size={18} aria-hidden="true" /><span className="text-sm font-semibold">Insight prioritário</span></div><p>{data.insight}</p></div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-amber-50 p-3 ring-1 ring-amber-100"><p className="text-xs font-semibold text-amber-700">Risco</p><p className="mt-1 font-semibold text-amber-900">{data.alerts > 6 ? 'Médio alto' : 'Médio'}</p></div><div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-100"><p className="text-xs font-semibold text-emerald-700">Oportunidade</p><p className="mt-1 font-semibold text-emerald-900">Respostas rápidas</p></div><div className="rounded-lg bg-sky-50 p-3 ring-1 ring-sky-100"><p className="text-xs font-semibold text-sky-700">Prioridade</p><p className="mt-1 font-semibold text-sky-900">Fila técnica</p></div></div></div></Panel>
          <Panel title="Recomendações da IA" subtitle="Ações sugeridas para a liderança" icon={Sparkles}><div className="space-y-3">{['Automatizar respostas de WhatsApp para ' + data.reasons[0].name.toLowerCase() + '.', 'Reforçar cobertura nos canais de maior volume: ' + data.channels[0].name + ' e ' + data.channels[1].name + '.', 'Acompanhar atendentes com SLA abaixo de 95% e TMA acima da média do período.'].map((recommendation) => <div className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4" key={recommendation}><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" /><p className="text-sm leading-6 text-slate-600">{recommendation}</p></div>)}</div></Panel>
        </section>

        <section className="mt-5"><Panel title="Pergunte aos dados" subtitle="Consulta em linguagem natural sobre os indicadores do período selecionado" icon={Search} action={<span className="hidden text-xs font-semibold text-slate-500 sm:inline">Base fictícia atualizada {data.updatedAt}</span>}><form onSubmit={handleAsk} className="grid gap-4 lg:grid-cols-[1fr_auto]"><div className="relative"><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input value={question} onChange={(event) => setQuestion(event.target.value)} className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100" placeholder="Ex.: qual canal tem mais atendimentos?" /></div><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"><Send size={17} aria-hidden="true" />Perguntar</button></form><div className="mt-4 rounded-lg border border-sky-100 bg-sky-50 p-4"><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-800"><Bot size={17} aria-hidden="true" />Resposta dos dados</div><p className="text-sm leading-6 text-slate-700">{answer}</p></div><div className="mt-3 flex flex-wrap gap-2">{['Qual canal tem mais atendimentos?', 'Como está o SLA?', 'Quem precisa de atenção?', 'Quais são os principais motivos?'].map((suggestion) => <button key={suggestion} onClick={() => { setQuestion(suggestion); setAnswer(buildDataAnswer(suggestion, data)); }} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">{suggestion}</button>)}</div></Panel></section>
      </div>
    </main>
  );
}
