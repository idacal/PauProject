import { Component } from '@angular/core';

interface Competitor {
  name: string;
  ticker: string;
  peerScore: number;
  marketCap: number;
}

@Component({
  selector: 'app-company-competitors-card',
  standalone: false,
  templateUrl: './company-competitors-card.html',
  styleUrl: './company-competitors-card.scss'
})
export class CompanyCompetitorsCard {
  
  public competitors: Competitor[] = [
    { name: 'Fate Therapeutics, Inc (FATE)', ticker: 'FATE', peerScore: 4.19, marketCap: 760.2 },
    { name: 'Xencor, Inc (XNXR)', ticker: 'XNXR', peerScore: 9.01, marketCap: 1393.5 },
    { name: 'MacroGenics, Inc (MGNX)', ticker: 'MGNX', peerScore: 15.44, marketCap: 1098.8 },
    { name: 'Nutrx Therapeutics, Inc (NRIX)', ticker: 'NRIX', peerScore: 18.1, marketCap: 703.1 },
    { name: 'Vir Technology, Inc (VIR)', ticker: 'VIR', peerScore: 19.1, marketCap: 1448.9 },
    { name: 'Relay Therapeutics, Inc (RLAY)', ticker: 'RLAY', peerScore: 19.52, marketCap: 1226.5 },
    { name: 'Scholar Rock Holding (SRPK)', ticker: 'SRPK', peerScore: 19.81, marketCap: 1198.3 },
    { name: 'Ymab Therapeutics, Inc (YMAB)', ticker: 'YMAB', peerScore: 20.04, marketCap: 1800.0 }
  ];

  constructor() { }

} 