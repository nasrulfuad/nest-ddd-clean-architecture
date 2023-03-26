import { Exclude, Type, Transform } from 'class-transformer';
import 'reflect-metadata';
import { WebResponseImpl } from './web.response-impl';

class Customer {
  constructor(public name: string, age: number, accounts: Account[]) {
    this.age = age;
    this.accounts = accounts;
  }

  @Exclude()
  public age: number;

  @Type(() => Account)
  public accounts: Account[];
}

class Account {
  constructor(public name: string, accountNumber: number, secret: string) {
    this.accountNumber = accountNumber;
    this.secret = secret;
  }

  @Transform(({ value }) => censorString(value.toString(), 4))
  public accountNumber: number;

  @Exclude()
  public secret: string;
}

function censorString(str: string, lastCharsToShow: number) {
  const s = str.slice(0, str.length - lastCharsToShow);
  return str.replace(s, '*'.repeat(s.length));
}

describe('WebResponse', () => {
  it('success', () => {
    const acc1 = new Account('acc1', 798328975894210, 'secret1');
    const acc2 = new Account('acc2', 202783584574720, 'secret2');

    const webResponse = new WebResponseImpl<Customer>(
      'Ok',
      new Customer('Customer Name', 20, [acc1, acc2]),
    ).transform(Customer);

    expect(webResponse.message).toBe('Ok');
    expect(webResponse.data.name).toBe('Customer Name');
    expect(webResponse.data.age).toBeUndefined();
    expect(webResponse.data.accounts[0].name).toBe('acc1');
    expect(webResponse.data.accounts[0].secret).toBeUndefined();
    expect(webResponse.data.accounts[0].accountNumber).toBe('***********4210')
    expect(webResponse.data.accounts[1].name).toBe('acc2');
    expect(webResponse.data.accounts[1].secret).toBeUndefined();
    expect(webResponse.data.accounts[1].accountNumber).toBe('***********4720');
  });
});
