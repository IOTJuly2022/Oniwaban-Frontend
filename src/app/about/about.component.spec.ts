import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Nandith info on buttonClick', () => {
    let nandithButton = fixture.nativeElement.querySelector('[id="nandith-button"]');
    nandithButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let nandithInfo = fixture.nativeElement.querySelector('[id="nandith-info"]');
    expect(nandithInfo).toBeTruthy();
    expect(nandithInfo.textContent).toContain('Instagram: @nandiththegod');
  });

  it('should display Eli info on buttonClick', () => {
    let eliButton = fixture.nativeElement.querySelector('[id="eli-button"]');
    eliButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let eliInfo = fixture.nativeElement.querySelector('[id="eli-info"]');
    expect(eliInfo).toBeTruthy();
    expect(eliInfo.textContent).toContain('Instagram: @eliwerbenjagermanjensen');
  });

  it('should display Ken info on buttonClick', () => {
    let kenButton = fixture.nativeElement.querySelector('[id="ken-button"]');
    kenButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let kenInfo = fixture.nativeElement.querySelector('[id="ken-info"]');
    expect(kenInfo).toBeTruthy();
    expect(kenInfo.textContent).toContain('Instagram: @kenbmasters');
  });

  it('should display Trent info on buttonClick', () => {
    let trentButton = fixture.nativeElement.querySelector('[id="trent-button"]');
    trentButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    let trentInfo = fixture.nativeElement.querySelector('[id="trent-info"]');
    expect(trentInfo).toBeTruthy();
    expect(trentInfo.textContent).toContain('Instagram: @im2tall4u1');
  });
});
