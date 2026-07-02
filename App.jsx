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

const kpis = [
  { label: 'Atendimentos', value: '8.742', change: '+12,4%', helper: 'vs. período anterior', icon: Headphones, tone: 'from-sky-500 to-cyan-400', bg: 'bg-sky-50', text: 'text-sky-700', trend: 'up' },
  { label: 'SLA', value: '94,8%', change: '+3,1 p.p.', helper: 'dentro do prazo', icon: Target, tone: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-50', text: 'text-emerald-700', trend: 'up' },
  { label: 'CSAT', value: '4,62', change: '+0,18', helper: 'nota média', icon: CheckCircle2, tone: 'from-teal-500 to-cyan-400', bg: 'bg-teal-50', text: 'text-teal-700', trend: 'up' },
  { label: 'TMA', value: '6m 42s', change: '-38s', helper: 'tempo médio', icon: Clock3, tone: 'from-amber-500 to-orange-400', bg: 'bg-amber-50', text: 'text-amber-700', trend: 'down' },
  { label: 'Pendentes', value: '318', change: '-9,6%', helper: 'fila atual', icon: AlertCircle, tone: 'from-rose-500 to-pink-400', bg: 'bg-rose-50', text: 'text-rose-700', trend: 'down' },
  { label: 'Reincidência', value: '7,9%', change: '-1,4 p.p.', helper: 'últimos 30 dias', icon: RefreshCcw, tone: 'from-indigo-500 to-violet-400', bg: 'bg-indigo-50', text: 'text-indigo-700', trend: 'down' },
];

const dailyTickets = [
  { day: 'Seg', atendimentos: 1080, resolvidos: 986 },
  { day: 'Ter', atendimentos: 1240, resolvidos: 1164 },
  { day: 'Qua', atendimentos: 1195, resolvidos: 1123 },
  { day: 'Qui', atendimentos: 1368, resolvidos: 1304 },
  { day: 'Sex', atendimentos: 1510, resolvidos: 1442 },
  { day: 'Sáb', atendimentos: 875, resolvidos: 812 },
  { day: 'Dom', atendimentos: 642, resolvidos: 587 },
];

const contactReasons = [
  { name: 'Instabilidade de conexão', value: 29, color: '#0ea5e9' },
  { name: 'Configuração de equipamento', value: 23, color: '#14b8a6' },
  { name: 'Lentidão de internet', value: 21, color: '#f59e0b' },
  { name: 'Acesso indisponível', value: 16, color: '#6366f1' },
  { name: 'Dúvidas técnicas', value: 11, color: '#f43f5e' },
];

const channelData = [
  { name: 'WhatsApp', value: 46, icon: MessageCircle, color: '#22c55e' },
  { name: 'Ligações', value: 27, icon: PhoneCall, color: '#0ea5e9' },
  { name: 'E-mail', value: 16, icon: Mail, color: '#6366f1' },
  { name: 'Chat', value: 11, icon: MessageSquareText, color: '#f59e0b' },
];

const analystSla = [
  { name: 'Ana', sla: 98 },
  { name: 'Bruno', sla: 96 },
  { name: 'Carla', sla: 94 },
  { name: 'Diego', sla: 91 },
  { name: 'Lia', sla: 97 },
  { name: 'Rafa', sla: 93 },
];

const analysts = [
  { name: 'Ana Martins', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 684, sla: '98%', csat: '4,8', tma: '5m 58s', status: 'Excelente' },
  { name: 'Bruno Costa', operation: 'Suporte técnico', channel: 'Ligações', tickets: 731, sla: '96%', csat: '4,6', tma: '6m 21s', status: 'Consistente' },
  { name: 'Carla Souza', operation: 'Suporte técnico', channel: 'E-mail', tickets: 612, sla: '94%', csat: '4,5', tma: '6m 44s', status: 'Atenção leve' },
  { name: 'Diego Lima', operation: 'Suporte técnico', channel: 'Chat', tickets: 589, sla: '91%', csat: '4,2', tma: '7m 36s', status: 'Priorizar fila' },
  { name: 'Lia Rocha', operation: 'Suporte técnico', channel: 'WhatsApp', tickets: 658, sla: '97%', csat: '4,7', tma: '6m 08s', status: 'Excelente' },
];

const aiRecommendations = [
  'WhatsApp concentra 46% dos atendimentos. Use respostas rápidas para instabilidade, lentidão e configuração de equipamento.',
  'A fila técnica pressiona SLA entre 14h e 17h. Reforce cobertura de ligações e chat nesse intervalo por 2 semanas.',
  'Clientes reincidentes devem entrar em acompanhamento ativo para reduzir nova abertura em até 72 horas.',
];

const filters = ['Hoje', '7 dias', '30 dias', 'Trimestre'];

function buildDataAnswer(question) {
  const text = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (!text.trim()) {
    return 'Digite uma pergunta sobre SLA, CSAT, TMA, pendentes, canais ou analistas para eu consultar os dados fictícios do painel.';
  }

  if (text.includes('whatsapp') || text.includes('ligacao') || text.includes('ligacoes') || text.includes('email') || text.includes('e-mail') || text.includes('chat') || text.includes('canal')) {
    return 'A avaliação por canal mostra WhatsApp com 46% dos atendimentos, ligações com 27%, e-mail com 16% e chat com 11%. O WhatsApp é o principal canal e deve receber mais automações de respostas rápidas.';
  }

  if (text.includes('sla')) {
    return 'O SLA geral está em 94,8%, próximo da meta de 95%. Ana, Lia e Bruno estão acima da meta; Diego está em 91% e deve ser priorizado na redistribuição da fila técnica.';
  }

  if (text.includes('csat') || text.includes('satisfacao') || text.includes('satisfação')) {
    return 'O CSAT médio está em 4,62. O melhor resultado é de Ana Martins, com 4,8. O ponto de atenção é Diego Lima, com 4,2, associado ao maior TMA e ao SLA abaixo da meta.';
  }

  if (text.includes('tma') || text.includes('tempo')) {
    return 'O TMA médio é 6m 42s, com melhora de 38 segundos. O maior TMA é de Diego Lima, com 7m 36s, indicando atendimentos técnicos mais complexos ou fila menos equilibrada.';
  }

  if (text.includes('pendente') || text.includes('fila')) {
    return 'Existem 318 atendimentos pendentes, queda de 9,6%. A fila crítica é de 42 casos, com maior risco no período entre 14h e 17h para suporte técnico.';
  }

  if (text.includes('motivo') || text.includes('problema') || text.includes('causa')) {
    return 'Os principais motivos são instabilidade de conexão (29%), configuração de equipamento (23%) e lentidão de internet (21%). Juntos, esses temas representam 73% da demanda técnica.';
  }

  if (text.includes('analista') || text.includes('atendente')) {
    return 'Todos os atendentes estão na operação de suporte técnico. Ana e Lia têm os melhores indicadores combinando SLA alto, CSAT forte e TMA abaixo da média. Diego exige acompanhamento por SLA de 91% e TMA de 7m 36s.';
  }

  return 'Resumo dos dados: a operação de suporte técnico está saudável, com SLA de 94,8%, CSAT de 4,62 e 8.742 atendimentos. O principal canal é WhatsApp e o maior foco operacional é reduzir reincidência em instabilidade e lentidão.';
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

function PeriodFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
      {filters.map((filter) => <button key={filter} className={'h-9 rounded-md px-3 text-sm font-semibold transition ' + (filter === '30 dias' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50')}>{filter}</button>)}
    </div>
  );
}

function ChannelCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {channelData.map((channel) => {
        const Icon = channel.icon;
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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Pergunte sobre SLA, CSAT, canais, pendentes, TMA, motivos ou analistas para ver uma resposta baseada nos dados fictícios.');

  function handleAsk(event) {
    event.preventDefault();
    setAnswer(buildDataAnswer(question));
  }

  function handleAiAnalysis() {
    setQuestion('Qual é o resumo da operação?');
    setAnswer(buildDataAnswer('resumo da operação suporte tecnico canais'));
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
            <PeriodFilters />
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><Filter size={17} aria-hidden="true" />Filtros</button>
            <button onClick={handleAiAnalysis} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"><Sparkles size={17} aria-hidden="true" />Gerar análise com IA</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
        <section className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-7 text-white shadow-panel">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/10"><CalendarDays size={15} aria-hidden="true" />Período ativo: últimos 30 dias</div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">Operação de suporte técnico monitorada em tempo real com leitura executiva por IA.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">Acompanhe WhatsApp, ligações, e-mail e chat em uma visão pensada para liderança, qualidade e apresentação em entrevista.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Resolvido</p><p className="mt-2 text-2xl font-semibold">92,4%</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Fila crítica</p><p className="mt-2 text-2xl font-semibold">42</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">NPS estimado</p><p className="mt-2 text-2xl font-semibold">71</p></div>
              <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10"><p className="text-sm text-slate-300">Canais</p><p className="mt-2 text-2xl font-semibold">4</p></div>
            </div>
          </div>

          <section className="rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-950 to-sky-950 p-6 text-white shadow-panel">
            <div className="flex items-center justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15"><Bot size={24} aria-hidden="true" /></div><span className="rounded-md bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">IA ativa</span></div>
            <h2 className="mt-5 text-xl font-semibold">Insights da IA</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">A operação está saudável, mas a fila técnica e a reincidência pedem ação preventiva. O maior ganho rápido está em padronizar respostas para WhatsApp e ligações.</p>
            <div className="mt-5 grid gap-3"><div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/10"><p className="text-xs text-slate-300">Principal canal</p><p className="mt-1 font-semibold">WhatsApp · 46%</p></div><div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/10"><p className="text-xs text-slate-300">Maior motivo</p><p className="mt-1 font-semibold">Instabilidade de conexão · 29%</p></div></div>
          </section>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{kpis.map((item) => <KpiCard item={item} key={item.label} />)}</section>

        <section className="mb-5"><Panel title="Avaliação por canal" subtitle="Distribuição dos atendimentos de suporte técnico por WhatsApp, ligações, e-mail e chat" icon={MessageCircle}><ChannelCards /></Panel></section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
          <Panel title="Atendimentos por dia" subtitle="Volume recebido e resolvido na semana" icon={TrendingUp} action={<span className="text-xs font-semibold text-slate-500">Meta: resolver 90%+</span>}>
            <div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={dailyTickets} margin={{ top: 10, right: 18, left: -18, bottom: 0 }}><defs><linearGradient id="ticketFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.28} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} /></linearGradient><linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.22} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)' }} /><Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 16 }} /><Area type="monotone" dataKey="atendimentos" name="Atendimentos" stroke="#0ea5e9" strokeWidth={3} fill="url(#ticketFill)" /><Area type="monotone" dataKey="resolvidos" name="Resolvidos" stroke="#14b8a6" strokeWidth={3} fill="url(#resolvedFill)" /></AreaChart></ResponsiveContainer></div>
          </Panel>

          <Panel title="Motivos de contato" subtitle="Principais demandas técnicas" icon={MessageSquareText}>
            <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.9fr]">
              <div className="h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={contactReasons} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3}>{contactReasons.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }} formatter={(value) => [value + '%', 'Participação']} /></PieChart></ResponsiveContainer></div>
              <div className="space-y-3">{contactReasons.map((reason) => <div className="rounded-lg border border-slate-100 bg-slate-50 p-3" key={reason.name}><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ backgroundColor: reason.color }} /><span className="text-sm font-medium text-slate-700">{reason.name}</span></div><span className="text-sm font-semibold text-slate-950">{reason.value}%</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-200"><div className="h-1.5 rounded-full" style={{ width: reason.value + '%', backgroundColor: reason.color }} /></div></div>)}</div>
            </div>
          </Panel>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.25fr]">
          <Panel title="SLA por atendente" subtitle="Todos da operação de suporte técnico · meta 95%" icon={UsersRound}><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={analystSla} margin={{ top: 8, right: 14, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis domain={[80, 100]} tickLine={false} axisLine={false} tickFormatter={(value) => value + '%'} /><Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }} formatter={(value) => [value + '%', 'SLA']} /><Bar dataKey="sla" radius={[7, 7, 0, 0]} fill="#14b8a6" /></BarChart></ResponsiveContainer></div></Panel>
          <Panel title="Tabela de atendentes" subtitle="Suporte técnico por canal, produtividade, qualidade e tempo médio" icon={UsersRound}><div className="overflow-x-auto"><table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm"><thead><tr className="text-slate-500">{['Atendente', 'Operação', 'Canal', 'Tickets', 'SLA', 'CSAT', 'TMA', 'Status'].map((heading) => <th className="border-b border-slate-200 pb-3 font-semibold" key={heading}>{heading}</th>)}</tr></thead><tbody>{analysts.map((analyst) => <tr className="text-slate-700" key={analyst.name}><td className="border-b border-slate-100 py-4 font-semibold text-slate-950">{analyst.name}</td><td className="border-b border-slate-100 py-4">{analyst.operation}</td><td className="border-b border-slate-100 py-4">{analyst.channel}</td><td className="border-b border-slate-100 py-4">{analyst.tickets}</td><td className="border-b border-slate-100 py-4">{analyst.sla}</td><td className="border-b border-slate-100 py-4">{analyst.csat}</td><td className="border-b border-slate-100 py-4">{analyst.tma}</td><td className="border-b border-slate-100 py-4"><StatusBadge>{analyst.status}</StatusBadge></td></tr>)}</tbody></table></div></Panel>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel title="Resumo gerado por IA" subtitle="Leitura executiva dos principais sinais" icon={Bot} className="border-indigo-200 shadow-panel"><div className="space-y-5 text-sm leading-6 text-slate-600"><div className="rounded-lg bg-indigo-50 p-5 ring-1 ring-indigo-100"><div className="mb-3 flex items-center gap-2 text-indigo-700"><Zap size={18} aria-hidden="true" /><span className="text-sm font-semibold">Insight prioritário</span></div><p>A operação de suporte técnico apresenta melhora consistente em SLA e satisfação. O volume subiu 12,4% sem queda relevante no CSAT, mas WhatsApp, ligações e reincidência merecem acompanhamento nas próximas 72 horas.</p></div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-amber-50 p-3 ring-1 ring-amber-100"><p className="text-xs font-semibold text-amber-700">Risco</p><p className="mt-1 font-semibold text-amber-900">Médio</p></div><div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-100"><p className="text-xs font-semibold text-emerald-700">Oportunidade</p><p className="mt-1 font-semibold text-emerald-900">Respostas rápidas</p></div><div className="rounded-lg bg-sky-50 p-3 ring-1 ring-sky-100"><p className="text-xs font-semibold text-sky-700">Prioridade</p><p className="mt-1 font-semibold text-sky-900">Fila técnica</p></div></div></div></Panel>
          <Panel title="Recomendações da IA" subtitle="Ações sugeridas para a liderança" icon={Sparkles}><div className="space-y-3">{aiRecommendations.map((recommendation) => <div className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4" key={recommendation}><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" /><p className="text-sm leading-6 text-slate-600">{recommendation}</p></div>)}</div></Panel>
        </section>

        <section className="mt-5"><Panel title="Pergunte aos dados" subtitle="Consulta em linguagem natural sobre os indicadores" icon={Search} action={<span className="hidden text-xs font-semibold text-slate-500 sm:inline">Base fictícia atualizada há 8 min</span>}><form onSubmit={handleAsk} className="grid gap-4 lg:grid-cols-[1fr_auto]"><div className="relative"><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input value={question} onChange={(event) => setQuestion(event.target.value)} className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100" placeholder="Ex.: qual canal tem mais atendimentos?" /></div><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"><Send size={17} aria-hidden="true" />Perguntar</button></form><div className="mt-4 rounded-lg border border-sky-100 bg-sky-50 p-4"><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-800"><Bot size={17} aria-hidden="true" />Resposta dos dados</div><p className="text-sm leading-6 text-slate-700">{answer}</p></div><div className="mt-3 flex flex-wrap gap-2">{['Qual canal tem mais atendimentos?', 'Como está o SLA?', 'Quem precisa de atenção?', 'Quais são os principais motivos?'].map((suggestion) => <button key={suggestion} onClick={() => { setQuestion(suggestion); setAnswer(buildDataAnswer(suggestion)); }} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">{suggestion}</button>)}</div></Panel></section>
      </div>
    </main>
  );
}
