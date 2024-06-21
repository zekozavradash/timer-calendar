import React, { useState } from 'react';
import './index.css';

interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(date);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month, getDaysInMonth(date));
    const startingDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    const totalDays = getDaysInMonth(date);

    return {
      year,
      month,
      firstDay,
      lastDay,
      startingDay,
      totalDays
    };
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button className='prev' onClick={prevMonth}>Prev</button>
        <span className='monthofyear'>{monthsOfYear[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button className='next' onClick={nextMonth}>Next</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    return (
      <div className="days-of-week">
        {daysOfWeek.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const monthData = getMonthData(currentDate);
    const { startingDay, totalDays } = monthData;

    let days: JSX.Element[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(<div key={day} className="day">{day}</div>);
    }

    return (
      <div className="days">
        {days}
      </div>
    );
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
