USE [DB_40114_codeclub]
GO
/****** Object:  StoredProcedure [Accounting].[resetSeeds]    Script Date: 03/06/2013 16:34:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   proc [Accounting].[resetSeeds]
as

BEGIN transaction T1;

delete from accounting.bank

delete from accounting.ccfee
delete from accounting.fee



delete from Accounting.invoiceService;
delete from Accounting.invoicePayment;
delete from Accounting.externalPayment
delete from Accounting.internalPayment;
delete from Accounting.invoiceAction;
delete from Accounting.invoiceActionTransaction;
delete from Accounting.entitywallettransaction;
delete from Accounting.entitywallet;

delete from Accounting.paymentActionTransaction;
delete from Accounting.paymentAction;

delete from Accounting.ccfee;
delete from Accounting.fee;
delete from Accounting.account;
delete from Accounting.card;
delete from Accounting.ccCard;
delete from Accounting.dbCard;
delete from Accounting.cardType;
delete from Accounting.mcCard;
delete from Accounting.visaCard;
delete from Accounting.payment;
delete from Accounting.paymentType;
delete from Accounting.ccPayment;
delete from Accounting.dbPayment;
delete from Accounting.extPaymentType;

delete from Accounting.glType;
delete from Accounting.categoryType;


delete from Accounting.currencyType;
delete from Accounting.currency;

delete from Accounting.[transaction];
delete from Accounting.invoiceStat;
delete from Accounting.invoice;
delete from Accounting.service;
delete from Accounting.entityCard;
delete from Accounting.entity;

delete from Accounting.person;


DBCC CHECKIDENT ( 'Accounting.card',reseed, 0);
DBCC CHECKIDENT ( 'Accounting.ccCard',reseed, 0);
DBCC CHECKIDENT ( 'Accounting.dbCard',reseed, 0);
 
 DBCC CHECKIDENT ( 'Accounting.mcCard',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.visaCard',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.payment',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.externalPayment',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.internalPayment',reseed, 0);
 
 DBCC CHECKIDENT ( 'Accounting.ccPayment',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.dbPayment',reseed, 0);
 


 DBCC CHECKIDENT ( 'Accounting.invoicePayment',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.currency',reseed, 0);

 DBCC CHECKIDENT ( 'Accounting.account',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.[transaction]',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.entity',reseed, 0);
 
 DBCC CHECKIDENT ( 'Accounting.invoice',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.invoiceAction',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.invoiceActionTransaction',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.service',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.invoiceService',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.entityCard',reseed, 0);
 
 DBCC CHECKIDENT ( 'Accounting.entitywallettransaction',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.entitywallet',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.paymentAction',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.paymentActionTransaction',reseed, 0);
 
 
 
 DBCC CHECKIDENT ( 'Accounting.bank',reseed, 0);

 DBCC CHECKIDENT ( 'Accounting.ccfee',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.ccfee',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.fee',reseed, 0);
 DBCC CHECKIDENT ( 'Accounting.card',reseed, 0);
 
 DBCC CHECKIDENT ( 'Accounting.person',reseed, 0);

 delete from Accounting.person --where entityID is null;
 
 
 
 --GLTYPE
 delete from Accounting.glType
 insert into Accounting.glType (id,name)values(1,'ASSET');
 insert into Accounting.glType (id,name)values(2,'OE');
 insert into Accounting.glType (id,name)values(3,'LIB');
  --CATEGORYTYPE
 delete from Accounting.categoryType
 insert into Accounting.categoryType (id,name,glTypeID)values(1,'AR',1);
 insert into Accounting.categoryType (id,name,glTypeID)values(2,'W',1);
 insert into Accounting.categoryType (id,name,glTypeID)values(3,'DBCASH',1);
 insert into Accounting.categoryType (id,name,glTypeID)values(4,'CCCASH',1);
 insert into Accounting.categoryType (id,name,glTypeID)values(8,'INC',2);
 insert into Accounting.categoryType (id,name,glTypeID)values(9,'EXP',2);
 insert into Accounting.categoryType (id,name,glTypeID)values(10,'AP',3);
 --CardType
 delete from cardType
 insert into Accounting.cardType (id,name)values(1,'DEBITCARD');
 insert into Accounting.cardType (id,name)values(2,'CREDITCARD');
 --ccCardType
 delete from ccCardType
 insert into Accounting.ccCardType (id,name)values(1,'MASTERCARD');
 insert into Accounting.cardType (id,name)values(2,'VISACARD');
 --CurrencyType
 delete from Accounting.currencyType
 insert into Accounting.currencyType (id,name)values(1,'REAL');
 insert into Accounting.currencyType (id,name)values(2,'UNREAL');
 --entityType
 delete from entityType
 insert into Accounting.entityType (id,name)values(1,'Organization');
 insert into Accounting.entityType (id,name)values(2,'Office');
 insert into Accounting.entityType (id,name)values(3,'Person');
 insert into Accounting.entityType (id,name)values(4,'Bank');
 --invoiceStat
 delete from invoiceStat
 insert into Accounting.invoiceStat (id,name)values(1,'Generated');
 insert into Accounting.invoiceStat (id,name)values(2,'Finalized');
 insert into Accounting.invoiceStat (id,name)values(3,'Deleted');
 insert into Accounting.invoiceStat (id,name)values(4,'Cancelled');
 insert into Accounting.invoiceStat (id,name)values(5,'internalPaymant');
 insert into Accounting.invoiceStat (id,name)values(6,'interacPaymant');
 insert into Accounting.invoiceStat (id,name)values(7,'visaCardPaymant');
 insert into Accounting.invoiceStat (id,name)values(8,'masterCardPaymant');
 insert into Accounting.invoiceStat (id,name)values(9,'partialInternalPaymantCancelled');
 insert into Accounting.invoiceStat (id,name)values(10,'partialInteracPaymantCancelled');
 insert into Accounting.invoiceStat (id,name)values(11,'partialCreditCardPaymantCancelled');
 --external Payment Type
 delete from extPaymentType
 insert into Accounting.extPaymentType(id,name)values(1,'CreditPayment');
 insert into Accounting.extPaymentType(id,name)values(2,'InteracPayment');
 --Payment Type
 delete from paymentType
 insert into Accounting.PaymentType(id,name)values(1,'External');
 insert into Accounting.PaymentType(id,name)values(2,'Internal');
 --office Type
 delete from Accounting.officeType
 insert into Accounting.officeType(id,name)values(1,'TemporaryOffice');
 insert into Accounting.officeType(id,name)values(2,'HeadOffice');
 insert into Accounting.officeType(id,name)values(3,'BankBranch');
 --userType
 delete from userType
 insert into Accounting.userType(id,name)values(1,'AppUser');
 insert into Accounting.userType(id,name)values(2,'SysUser');
 --sysUserType
 delete from sysUserType
 insert into Accounting.sysUserType(id,name)values(1,'NormalsysUser');
 insert into Accounting.sysUserType(id,name)values(2,'AdminSysUser');
 --paymentStat
 delete from paymentstat
 insert into Accounting.paymentStat(id,name)values(1,'PaidApproved');
 insert into Accounting.paymentStat(id,name)values(2,'VoidApproved');
 insert into Accounting.paymentStat(id,name)values(3,'RefundApproved');
 insert into Accounting.paymentStat(id,name)values(4,'NotApprovedPaid');
 insert into Accounting.paymentStat(id,name)values(5,'NotApprovedVoid');
 insert into Accounting.paymentStat(id,name)values(6,'NotApprovedRefund');
 

commit transaction T1;


