

export function omitUndefined<T>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== undefined
    ) {
      result[key] = obj[key];
    }
  }

  return result;
}

export const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);


export function formatDateIndianStyle(date:Date) {
  const options:Intl.DateTimeFormatOptions  = { year:"numeric", month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-IN', options).format(date);
}

