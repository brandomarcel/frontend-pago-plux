import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonPluxComponent } from './button-plux.component';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';

describe('ButtonPluxComponent', () => {
  let component: ButtonPluxComponent;
  let fixture: ComponentFixture<ButtonPluxComponent>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TransactionService', ['consultarTransaccion']);

    await TestBed.configureTestingModule({
      imports: [ButtonPluxComponent],
      providers: [
        { provide: TransactionService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonPluxComponent);
    component = fixture.componentInstance;
    transactionServiceSpy = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit transaccionCompletada with data on successful transaction', () => {
    const responseMock = {
      status: 'succeeded',
      detail: {
        id_transaccion: '123'
      }
    };

    const mockTransactionResult = {
      detail: {
        respuest: { estado: 'succeeded', id: '123' }
      }
    };

    transactionServiceSpy.consultarTransaccion.and.returnValue(of(mockTransactionResult));

    spyOn(component.transaccionCompletada, 'emit');

    component.data.onAuthorize.call(component, responseMock);

    expect(transactionServiceSpy.consultarTransaccion).toHaveBeenCalledWith('123');
    expect(component.transaccionCompletada.emit).toHaveBeenCalledWith('procesando');
    expect(component.transaccionCompletada.emit).toHaveBeenCalledWith(mockTransactionResult.detail.respuest);
  });
});
