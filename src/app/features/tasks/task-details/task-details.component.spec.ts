import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for PrimeNG animations
import { By } from '@angular/platform-browser';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskDetailsComponent,
        BrowserAnimationsModule, // Add this module for animations
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display task details when task is provided', () => {
    component.task = {
      name: 'Test Task',
      description: 'Test description',
      status: 'In Progress',
      assignedTo: 'John Doe',
      priority: 'High',
      dueDate: new Date('2024-12-31'),
    };
    component.visible = true;

    fixture.detectChanges();

    const dialog = fixture.debugElement.query(By.css('p-dialog'));
    expect(dialog).toBeTruthy();

    const name = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    const description = fixture.debugElement.query(By.css('p:nth-of-type(1)')).nativeElement.textContent;
    const status = fixture.debugElement.query(By.css('p:nth-of-type(2)')).nativeElement.textContent;
    const assignedTo = fixture.debugElement.query(By.css('p:nth-of-type(3)')).nativeElement.textContent;
    const priority = fixture.debugElement.query(By.css('p:nth-of-type(4)')).nativeElement.textContent;
    const dueDate = fixture.debugElement.query(By.css('p:nth-of-type(5)')).nativeElement.textContent;

    expect(name).toContain('Test Task');
    expect(description).toContain('Test description');
    expect(status).toContain('In Progress');
    expect(assignedTo).toContain('John Doe');
    expect(priority).toContain('High');
    expect(dueDate).toContain('Dec 31, 2024'); // Check formatted date
  });

  it('should show "N/A" for missing task details', () => {
    component.task = {};
    component.visible = true;

    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    const description = fixture.debugElement.query(By.css('p:nth-of-type(1)')).nativeElement.textContent;
    const status = fixture.debugElement.query(By.css('p:nth-of-type(2)')).nativeElement.textContent;
    const assignedTo = fixture.debugElement.query(By.css('p:nth-of-type(3)')).nativeElement.textContent;
    const priority = fixture.debugElement.query(By.css('p:nth-of-type(4)')).nativeElement.textContent;
    const dueDate = fixture.debugElement.query(By.css('p:nth-of-type(5)')).nativeElement.textContent;

    expect(name).toContain('N/A');
    expect(description).toContain('N/A');
    expect(status).toContain('N/A');
    expect(assignedTo).toContain('N/A');
    expect(priority).toContain('N/A');
    expect(dueDate).toContain('N/A');
  });

  it('should emit visibleChange and close dialog when closeDialog is called', () => {
    spyOn(component.visibleChange, 'emit');

    component.visible = true;
    component.closeDialog();

    expect(component.visible).toBeFalse();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should render the close button and call closeDialog when clicked', () => {
    spyOn(component, 'closeDialog');

    component.visible = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    expect(closeButton).toBeTruthy();

    closeButton.nativeElement.click();
    expect(component.closeDialog).toHaveBeenCalled();
  });
});
