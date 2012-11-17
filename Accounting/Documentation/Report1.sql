select 'Invoice Actions' as '-';
select i.ID as invoiceID,i.receiverEntityID,i.issuerEntityID,
_is.name stat,
t.ID as transactionID,t.amount,

a.ID as accountID,a.ownerEntityID,
gt.name as GL,ct.name as Category,
a.balance,
c.name as currency

from Accounting.invoice i 
LEFT join Accounting.invoiceAction ia on i.ID=ia.invoiceID
LEFT join Accounting.invoiceStat _is on _is.ID=ia.invoiceStatID
left join Accounting.invoiceActionTransaction iat on iat.invoiceActionID=ia.ID
left join Accounting.[transaction] as t on  t.ID=iat.transactionID
left join Accounting.account a on a.ID=t.accountID
left join Accounting.currency as c on  c.ID=i.currencyID
left join Accounting.categoryType ct on ct.ID=a.catTypeID
left join Accounting.glType gt on gt.ID=ct.glTypeID
;

select * from Accounting.currency;
select * from Accounting.currencyType;


select 'Services' as '-';
select * from Accounting.service;

select 'Invoice Payments' as '-';
select ip.invoiceID,p.ID paymentid,p.payerEntityID,p.payeeEntityID,p.amount 
from Accounting.invoicePayment ip
inner join Accounting.payment p on p.ID=ip.paymentID;



