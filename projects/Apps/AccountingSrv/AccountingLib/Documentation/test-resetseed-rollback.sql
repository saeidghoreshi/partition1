
begin transaction t1
exec [Accounting].[resetSeeds];

select * from Accounting.account;

rollback transaction t1

select * from Accounting.account;