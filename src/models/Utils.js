function Utils() {
  const me = {};

  const period = ["Day", "Week", "Month", "Year"];
  
  me.period = period;

  return me;
}

export const utils = Utils();