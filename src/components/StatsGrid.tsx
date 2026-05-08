import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, Users, CloudOff, AlertCircle } from "lucide-react";

const debtData = [
  { year: '2000', rate: 45 },
  { year: '2005', rate: 52 },
  { year: '2010', rate: 61 },
  { year: '2015', rate: 75 },
  { year: '2020', rate: 88 },
  { year: '2025', rate: 94 },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={<AlertCircle className="text-red-400" />}
        label="Small Farmer Debt"
        value="94%"
        detail="Household debt in rural areas"
        delay={0.1}
      />
      <StatCard 
        icon={<CloudOff className="text-blue-400" />}
        label="Rainfall Deficit"
        value="-22%"
        detail="Departure from normal"
        delay={0.2}
      />
      <StatCard 
        icon={<TrendingDown className="text-stone-400" />}
        label="Migration Rate"
        value="+15.4%"
        detail="Annual rural to urban shift"
        delay={0.3}
      />
      <StatCard 
        icon={<Users className="text-clay-500" />}
        label="Workforce"
        value="42M"
        detail="Farmers left the industry"
        delay={0.4}
      />

      <div className="md:col-span-2 lg:col-span-4 h-[400px] glass rounded-3xl p-8 mt-6">
        <div className="flex flex-col mb-8">
          <h4 className="font-serif text-2xl font-medium mb-2">The Rising Tide of Debt</h4>
          <p className="text-stone-400 text-sm">Percent of agricultural households in debt over the decades.</p>
        </div>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={debtData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b87333" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b87333" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c241c" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#554a3f" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#554a3f" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2c241c', 
                  border: '1px solid #3f352c',
                  borderRadius: '12px'
                }}
                itemStyle={{ color: '#stone-100' }}
              />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke="#b87333" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRate)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  delay: number;
}

function StatCard({ icon, label, value, detail, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-3xl p-8 border-stone-800 flex flex-col gap-4"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-stone-500 text-xs uppercase tracking-widest font-mono mb-1">{label}</p>
        <h5 className="text-4xl font-serif font-medium text-stone-100 mb-2">{value}</h5>
        <p className="text-stone-400 text-sm">{detail}</p>
      </div>
    </motion.div>
  );
}
