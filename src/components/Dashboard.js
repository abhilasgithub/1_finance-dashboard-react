import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const EXPENSES = [
  { category: 'Housing', amount: 1200, color: '#4299e1' },
  { category: 'Food', amount: 450, color: '#48bb78' },
  { category: 'Transport', amount: 220, color: '#ed8936' },
  { category: 'Entertainment', amount: 180, color: '#9f7aea' },
  { category: 'Healthcare', amount: 150, color: '#f56565' },
  { category: 'Savings', amount: 400, color: '#38b2ac' },
];

const MONTHLY = [
  { month: 'Jan', income: 3200, expenses: 2600 },
  { month: 'Feb', income: 3200, expenses: 2400 },
  { month: 'Mar', income: 3500, expenses: 2800 },
  { month: 'Apr', income: 3200, expenses: 2200 },
  { month: 'May', income: 3800, expenses: 3100 },
  { month: 'Jun', income: 3200, expenses: 2600 },
];

const SAVINGS = [
  { month: 'Jan', savings: 600 }, { month: 'Feb', savings: 800 },
  { month: 'Mar', savings: 700 }, { month: 'Apr', savings: 1000 },
  { month: 'May', savings: 700 }, { month: 'Jun', savings: 600 },
];

const card = { background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' };

export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const total = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const stats = [
    { label: 'Monthly Income', value: '$3,200', icon: '💵', color: '#48bb78' },
    { label: 'Total Expenses', value: `$${total}`, icon: '📉', color: '#f56565' },
    { label: 'Net Savings', value: `$${3200 - total}`, icon: '🏦', color: '#4299e1' },
    { label: 'Savings Rate', value: `${Math.round(((3200 - total) / 3200) * 100)}%`, icon: '📈', color: '#9f7aea' },
  ];

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, borderLeft: `4px solid ${s.color}`, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '2rem' }}>{s.icon}</span>
            <div>
              <p style={{ fontSize: '0.85rem', color: '#718096' }}>{s.label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['overview', 'monthly', 'savings'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '8px 20px', border: '2px solid', borderColor: tab === t ? '#2b6cb0' : '#e2e8f0', background: tab === t ? '#2b6cb0' : 'white', color: tab === t ? 'white' : '#4a5568', borderRadius: 8, cursor: 'pointer', fontSize: '0.95rem' }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: tab === 'overview' ? 'repeat(auto-fit,minmax(350px,1fr))' : '1fr', gap: 20 }}>
        {tab === 'overview' && <>
          <div style={card}>
            <h3 style={{ marginBottom: 16, color: '#4a5568' }}>Spending Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart><Pie data={EXPENSES} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ category, percent }) => `${category} ${(percent*100).toFixed(0)}%`}>
                {EXPENSES.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie><Tooltip formatter={v => `$${v}`} /></PieChart>
            </ResponsiveContainer>
          </div>
          <div style={card}>
            <h3 style={{ marginBottom: 16, color: '#4a5568' }}>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={EXPENSES} layout="vertical">
                <XAxis type="number" tickFormatter={v => `$${v}`} /><YAxis dataKey="category" type="category" width={100} />
                <Tooltip formatter={v => `$${v}`} />
                <Bar dataKey="amount">{EXPENSES.map((e,i) => <Cell key={i} fill={e.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>}
        {tab === 'monthly' && <div style={card}>
          <h3 style={{ marginBottom: 16, color: '#4a5568' }}>Income vs Expenses (6 months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MONTHLY}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={v=>`$${v}`} /><Tooltip formatter={v=>`$${v}`} /><Legend />
              <Bar dataKey="income" fill="#48bb78" name="Income" /><Bar dataKey="expenses" fill="#f56565" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>}
        {tab === 'savings' && <div style={card}>
          <h3 style={{ marginBottom: 16, color: '#4a5568' }}>Monthly Savings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={SAVINGS}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis tickFormatter={v=>`$${v}`} /><Tooltip formatter={v=>`$${v}`} />
              <Line type="monotone" dataKey="savings" stroke="#4299e1" strokeWidth={2} dot={{ r:5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>}
      </div>
    </div>
  );
}
