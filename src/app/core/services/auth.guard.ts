import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username === 'tasksadmin' && password === 'tasksadmin') {
    return true;
  } else {
    alert('Invalid credentials! Access denied.');
    return false; 
  }
};
