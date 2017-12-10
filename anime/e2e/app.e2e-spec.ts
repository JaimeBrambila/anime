import { Web3bwavePage } from './app.po';

describe('web3bwave App', () => {
  let page: Web3bwavePage;

  beforeEach(() => {
    page = new Web3bwavePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
