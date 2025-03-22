
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface StatisticsCardProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
  className?: string;
}

const StatisticsCard = ({
  title,
  subtitle,
  data,
  color = "rgba(59, 130, 246, 0.8)",
  className,
}: StatisticsCardProps) => {
  return (
    <div className={cn("p-6 rounded-xl glass transition-all duration-300 ease-in-out animate-in h-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(0,0,0,0.09)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(8px)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
              itemStyle={{ color: 'rgba(0,0,0,0.8)' }}
              labelStyle={{ fontSize: 12, fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#color-${title})`} 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsCard;
