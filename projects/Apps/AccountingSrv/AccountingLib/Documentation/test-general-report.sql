select * 
from Accounting.invoiceAction ia
inner join Accounting.invoiceStat iis on iis.ID=ia.invoiceStatID
;
select SUM(balance) as 'tootal accounts balance' from Accounting.account ;

select 'Union for Entities' as ' '; 
select p.entityID,p.firstName+'-'+p.lastName from Accounting.person p
union
select o.entityID,convert(varchar(200),o.ID) from Accounting.organization o


select 'Invoice Action Transactions' as '-';
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

select 'Invoice Payments' as '-';
select ip.invoiceID,p.ID paymentid,p.payerEntityID,p.payeeEntityID,p.amount 
from Accounting.invoicePayment ip
inner join Accounting.payment p on p.ID=ip.paymentID;


select 'entityWalletTxn' as ' '
select ew.title as 'EW-Title',ew.amount 'EW-Amount',ew.entityID 'EW-entityID',
ta.*

from Accounting.entityWallet ew 
inner join Accounting.entityWalletTransaction ewt on ewt.entityWalletID=ew.id
inner join accounting.transactionAccount as ta on  ta.transactionID=ewt.transactionID


select 'payment action ' as  ' ';
select 
p.ID as paymentID,p.amount,
ps.name,

pt.name as paymentType,
case when ept.name is null then '-' else ept.name end  as extPaymentType

from Accounting.payment p

inner join Accounting.paymentAction pa on p.ID=pa.paymentID
inner join Accounting.paymentstat ps on ps.ID=pa.paymentStatID

left join Accounting.externalPayment ep on ep.paymentID=p.ID
left join Accounting.internalPayment ip on ip.paymentID=p.ID
left join Accounting.paymentType pt on pt.ID=p.paymentTypeID 

left join Accounting.ccPayment cc on cc.extPaymentID=ep.ID
left join Accounting.dbPayment db on db.extPaymentID=ep.ID
left join Accounting.extPaymentType ept on ept.ID=ep.extPaymentTypeID 
;


select 'payment action Txns' as  ' ';
select 
ps.name,
ta.*
from Accounting.paymentAction pa
inner join Accounting.paymentActionTransaction pat on pa.ID=pat.paymentActionID
inner join Accounting.transactionaccount ta on ta.transactionID=pat.transactionID
inner join Accounting.paymentStat ps on pa.paymentStatID=ps.ID;


select * from Accounting.currency;
select * from Accounting.currencyType;
select 'Services' as '-';
select * from Accounting.service;

select * from Accounting.fee
select * from Accounting.ccfee
