import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePostComponent } from './template-post.component';

describe('TemplatePostComponent', () => {
  let component: TemplatePostComponent;
  let fixture: ComponentFixture<TemplatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
