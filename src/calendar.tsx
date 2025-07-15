import React, { useState } from 'react';
import './index.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();

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
    const startingDay = firstDay.getDay();
    const totalDays = getDaysInMonth(date);

    return {
      year,
      month,
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

  const renderHeader = () => (
    <div className="calendar-header">
      <button className='prev' onClick={prevMonth}>Prev</button>
      <span className='monthofyear'>
        {monthsOfYear[currentDate.getMonth()]} {currentDate.getFullYear()}
      </span>
      <button className='next' onClick={nextMonth}>Next</button>
    </div>
  );

  const renderDaysOfWeek = () => (
    <div className="days-of-week">
      {daysOfWeek.map(day => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );

  const renderDays = () => {
    const { startingDay, totalDays, year, month } = getMonthData(currentDate);

    const days: JSX.Element[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push(
        <div
          key={day}
          className={`day${isToday ? ' today' : ''}`}
        >
          {day}
        </div>
      );
    }

    return <div className="days">{days}</div>;
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
