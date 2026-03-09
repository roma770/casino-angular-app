import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobby } from './game-lobby';

describe('GameLobby', () => {
  let component: GameLobby;
  let fixture: ComponentFixture<GameLobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLobby],
    }).compileComponents();

    fixture = TestBed.createComponent(GameLobby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
