import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContrasenaOlvidadaPage } from './contrasena-olvidada.page';

describe('ContrasenaOlvidadaPage', () => {
  let component: ContrasenaOlvidadaPage;
  let fixture: ComponentFixture<ContrasenaOlvidadaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenaOlvidadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaOlvidadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
