import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZone } from '@angular/core';
import { StorageService } from './core/utilities/storage.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let router: Router;
  let ngZone: NgZone;

  // Mock for Router
  const routerEvents$ = new Subject(); // Use Subject for Router events
  const routerMock = {
    url: '/tasks', // Default URL
    events: routerEvents$.asObservable(), // Use Subject as events observable
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: Router, useValue: routerMock }, // Mock Router
        { provide: StorageService, useValue: {} }, // Mock StorageService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
  });

  afterEach(() => {
    routerEvents$.complete(); // Complete the Subject after tests
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show header when not on /login route', () => {
    routerMock.url = '/tasks'; // Set mock URL
    routerEvents$.next({}); // Emit a router event
    fixture.detectChanges();

    expect(component.isHeaderVisible).toBeTrue();
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy(); // Header should be in the DOM
  });

  it('should hide header when on /login route', () => {
    routerMock.url = '/login'; // Set mock URL
    routerEvents$.next({}); // Emit a router event
    fixture.detectChanges();

    expect(component.isHeaderVisible).toBeFalse();
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeNull(); // Header should not be in the DOM
  });

  it('should toggle dark theme when toggleTheme is called', () => {
    spyOn(document.body.classList, 'toggle').and.callThrough();

    component.toggleTheme();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-theme');
  });
});
