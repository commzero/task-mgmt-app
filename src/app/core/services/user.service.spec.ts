import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(UserService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should log in successfully with correct credentials', () => {
      const username = 'tasksAdmin';
      const password = 'tasksAdmin';

      const result = service.login(username, password);

      expect(result).toBeTrue();
      expect(localStorage.getItem('authToken')).toBe('mock-token');
      expect(localStorage.getItem('username')).toBe(username);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
    });

    it('should fail to log in with incorrect credentials', () => {
      const username = 'wrongUser';
      const password = 'wrongPassword';

      const result = service.login(username, password);

      expect(result).toBeFalse();
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should log out the user and remove token from localStorage', () => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('username', 'tasksAdmin');

      service.logout();

      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if the user is authenticated', () => {
      localStorage.setItem('authToken', 'mock-token');

      const result = service.isAuthenticated();

      expect(result).toBeTrue();
    });

    it('should return false if the user is not authenticated', () => {
      localStorage.removeItem('authToken');

      const result = service.isAuthenticated();

      expect(result).toBeFalse();
    });
  });
});
