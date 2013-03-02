<?php
namespace Accounting;                                     

abstract class Account{}

abstract class AssetAccount extends Account
{
    const accountTYPE = \Accounting\Enums\ASSET::Value;
}
abstract class OEAccount extends Account
{
    const accountTYPE = \Accounting\Enums\OE::Value;
}
abstract class LibAccount extends Account
{
    const accountTYPE = \Accounting\Enums\LIB::Value;
}
    
print AssetAccount::accountTYPE;
print OEAccount::accountTYPE;
print LibAccount::accountTYPE;

?>
    