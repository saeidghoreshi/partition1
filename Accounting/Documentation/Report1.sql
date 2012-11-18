

select 'Union for Entities';
select p.entityID,p.firstName+'-'+p.lastName from Accounting.person p
union
select o.entityID,convert(varchar(200),o.ID) from Accounting.organization o



select 'Invoice Actions' as '-';
select i.ID as invoiceID,i.receiverEntityID,i.issuerEntityID,
_is.name stat,
ta.transactionID ,ta.amount,

ta.accountID,ta.ownerEntityID,
ta.GL,ta.Category,
ta.balance,
ta.currency

from Accounting.invoice i 
LEFT join Accounting.invoiceAction ia on i.ID=ia.invoiceID
LEFT join Accounting.invoiceStat _is on _is.ID=ia.invoiceStatID
left join Accounting.invoiceActionTransaction iat on iat.invoiceActionID=ia.ID
left join accounting.transactionAccount as ta on  ta.transactionID=iat.transactionID
;

select * from Accounting.currency;
select * from Accounting.currencyType;


select 'Services' as '-';
select * from Accounting.service;

select 'Invoice Payments' as '-';
select ip.invoiceID,p.ID paymentid,p.payerEntityID,p.payeeEntityID,p.amount 
from Accounting.invoicePayment ip
inner join Accounting.payment p on p.ID=ip.paymentID;


select 'entityWalletTxn'
select ew.title as 'EW-Title',ew.amount 'EW-Amount',ew.entityID 'EW-entityID',
ta.*

from Accounting.entityWallet ew 
inner join Accounting.entityWalletTransaction ewt on ewt.entityWalletID=ew.id
inner join accounting.transactionAccount as ta on  ta.transactionID=ewt.transactionID

select 'invoice payment Txns';
select 
pt.paymentID,
ta.*
from Accounting.paymenttransaction pt
inner join Accounting.invoicePayment ip on ip.ID = pt.PaymentID
inner join Accounting.transactionaccount ta on ta.transactionID=pt.transactionID
;