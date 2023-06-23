export const helpers = {
    'if_eq': function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },

    'is_due': function(dueDate) {
        const currentDate = new Date();
        const dueDateTime = new Date(dueDate);
        return dueDateTime <= currentDate;
    },
      
    'days_until_due': function(dueDate) {
        const currentDate = new Date();
        const dueDateTime = new Date(dueDate);
        const timeDiff = dueDateTime.getTime() - currentDate.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (dayDiff > 1) {
          return `${dayDiff} days until due`;
        } else if (dayDiff < -1) {
          return `${Math.abs(dayDiff)} days over due`;
        } else if (dayDiff === 1) {
            return'Due tomorrow';
        } else if (dayDiff === -1) {
            return 'Due yesterday';
        } else {
          return 'Due today';
        }
      }
}