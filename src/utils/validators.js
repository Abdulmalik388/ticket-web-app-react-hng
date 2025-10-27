export const allowedStatuses = ["open","in_progress","closed"];

export function validateTicket(values){
  const errors = {};
  if(!values.title || !values.title.trim()) errors.title = "Title is required";
  if(!values.status || !allowedStatuses.includes(values.status)) errors.status = "Status must be open, in_progress, or closed";
  if(values.description && values.description.length > 1000) errors.description = "Description too long";
  if(values.priority && !["low","medium","high"].includes(values.priority)) errors.priority = "Invalid priority";
  return errors;
}
