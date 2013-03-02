<?php
namespace Accounting\Enums;
                 
class ACCOUTTYPE
{   
}

class ASSET extends ACCOUTTYPE
{                  
    const Value = 1;
}
class OE extends ACCOUTTYPE
{
    const Value = 2;
}
class LIB extends ACCOUTTYPE
{
    const Value = 3;
}

class AssetCategories extends  ASSET
{
    const AR = 1;
    const W= 2;
    const DBCASH= 3;
    const CCCASH= 4;
}
class OECategories extends OE
{
    const INC = 8;
    const EXP = 9;                  
}
class LibCategories extends LIB
{
    const AP = 10;
}

class entityType 
{
    const Organization=1;
    const Office=2;
    const Person=3;
    const bank=4;
}
class officeType 
{
    const TemporaryOffice=1;
    const HeadOffice=2;
    const BankBranch=3;
}
class userType 
{ 
    const AppUser=1;
    const SysUser=2;
}
class sysUserType
{
    const NormalsysUser=1;
    const AdminSysUser=2;
}
class paymentType
{
    const External=1;
    const Internal=2;
}
class extPaymentType
{
    const CreditPayment=1;
    const InteracPayment=2;
}
class ccCardType
{
    const MASTERCARD=1;
    const VISACARD=2;
}
class cardType
{
    const DebitCard=1;
    const CreditCard=2;
}
class invoiceStat
{
    const Generated = 1;
    const Finalized = 2;
    const Deleted = 3;       /*If no Payments of any kind ever happend*/
    const Cancelled = 4;     /*if no payments occured or all payments voided or refunded*/

    const internalPaymant = 5;
    const interacPaymant = 6;
    const visaCardPaymant = 7;
    const masterCardPaymant = 8;

    const partialInternalPaymantCancelled = 9;
    const partialInteracPaymantCancelled = 10;
    const partialCreditCardPaymantCancelled = 11;
}
class paymentStat
{
    const PaidApproved = 1;
    const VoidApproved=2;
    const RefundApproved=3;
    const NotApprovedPaid =4 ;
    const NotApprovedVoid =5 ;
    const NotApprovedRefund =6;
}
class paymentAction
{
    const Void= 1;
    const Refund = 2;
}
class currencyType
{ 
    const Real=1;
    const UnReal=2;
}


?>
