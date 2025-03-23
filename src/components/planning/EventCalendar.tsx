
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isWeekend, addMonths, subMonths } from "date-fns";

// Types for events
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "Training" | "Drill" | "Meeting" | "Other";
}

interface EventCalendarProps {
  events: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
}

const EventCalendar = ({ events, onDateSelect }: EventCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };
  
  const getEventCountForDate = (date: Date): number => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    ).length;
  };
  
  const getEventTypeForDate = (date: Date): string => {
    const eventsOnDate = events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
    
    if (eventsOnDate.length === 0) return "";
    
    // Just return the type of the first event for the calendar indicator
    return eventsOnDate[0].type;
  };
  
  const getEventColorClass = (type: string): string => {
    switch (type) {
      case "Training": return "bg-purple-500";
      case "Drill": return "bg-orange-500";
      case "Meeting": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="w-full glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Event Calendar</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium w-40 text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCurrentMonth(date);
                  }
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="aspect-square p-1"></div>
        ))}
        
        {daysInMonth.map((day) => {
          const eventCount = getEventCountForDate(day);
          const eventType = getEventTypeForDate(day);
          const eventColorClass = getEventColorClass(eventType);
          
          return (
            <div 
              key={day.toString()}
              className={cn(
                "aspect-square p-1",
                !isSameMonth(day, currentMonth) && "opacity-50"
              )}
            >
              <button
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center rounded-md text-sm p-2 relative transition-colors",
                  isToday(day) && "border border-primary",
                  isWeekend(day) && "bg-muted/50",
                  selectedDate && day.getDate() === selectedDate.getDate() && 
                  day.getMonth() === selectedDate.getMonth() && 
                  day.getFullYear() === selectedDate.getFullYear() && 
                  "bg-primary text-primary-foreground",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => handleDateClick(day)}
              >
                <span className="text-xs">{format(day, "d")}</span>
                {eventCount > 0 && (
                  <div className="absolute bottom-1 right-1">
                    <div className={`${eventColorClass} h-2 w-2 rounded-full`}></div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
        
        {Array.from({ length: (6 * 7) - (startOfMonth(currentMonth).getDay() + daysInMonth.length) }).map((_, index) => (
          <div key={`empty-end-${index}`} className="aspect-square p-1"></div>
        ))}
      </div>
      
      {selectedDate && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-2">
            Events on {format(selectedDate, "MMMM d, yyyy")}
          </h4>
          {events.filter(event => 
            event.date.getDate() === selectedDate.getDate() && 
            event.date.getMonth() === selectedDate.getMonth() && 
            event.date.getFullYear() === selectedDate.getFullYear()
          ).length > 0 ? (
            <div className="space-y-2">
              {events.filter(event => 
                event.date.getDate() === selectedDate.getDate() && 
                event.date.getMonth() === selectedDate.getMonth() && 
                event.date.getFullYear() === selectedDate.getFullYear()
              ).map(event => (
                <div 
                  key={event.id} 
                  className="p-2 border rounded-md flex items-center"
                >
                  <div className={`${getEventColorClass(event.type)} h-3 w-3 rounded-full mr-2`}></div>
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-sm py-2">
              No events scheduled for this day
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
