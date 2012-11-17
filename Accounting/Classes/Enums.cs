using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace accounting.classes.enums
{
    public class ACCOUTTYPE
    {   
    }
    public class ASSET:ACCOUTTYPE
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int Value = 1;
    }
    public class OE:ACCOUTTYPE
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int Value = 2;
    }
    public class LIB:ACCOUTTYPE
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int Value = 3;
    }
    
    public class AssetCategories : ASSET
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int  AR = 1;
        public static readonly int  W= 2;
        public static readonly int  DBCASH= 3;
        public static readonly int  CCCASH= 4;
        

        public static readonly Dictionary<int,string> list = new Dictionary<int,string>() 
        {
           {1,"AR"},
           {2,"W"},
           {3,"DBCASH"},
           {4,"CCCASH"}
        };
    }
    public class OECategories : OE
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int INC = 8;
        public static readonly int EXP = 9;

        public static readonly Dictionary<int, string> list = new Dictionary<int, string>() 
        {
           {8,"INC"},
           {9,"EXP"}
        };
    }
    public class LibCategories : LIB
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int AP = 10;

        public static readonly Dictionary<int,string> list = new Dictionary<int,string>() 
        {
           {10,"AP"}
        };
    }

    public enum entityType 
    {
        Organization=1,
        Office=2,
        Person=3
    }
    public enum officeType 
    {
        TemporaryOffice=1,
        HeadOffice=2,
        BankBranch=3
    }
    public enum userType 
    { 
        AppUser=1,
        SysUser=2
    }
    public enum sysUserType
    {
        NormalsysUser=1,
        AdminSysUser=2
    }
    public enum paymentType
    {
        External=1,
        Internal=2
    }
    public enum extPaymentType
    {
        CreditPayment=1,
        InteracPayment=2
    }
    public enum ccCardType
    {
        MASTERCARD=1,
        VISACARD=2
    }
    public enum cardType
    {
        DebitCard=1,
        CreditCard=2
    }
    public enum invoiceStat
    {
        Generated=1,
        Finalized=2, 
        Deleted=3       /*If no Payments of any kind ever happend*/,
        Cancelled=4     /*if no payments occured or all payments voided or refunded*/,
        internalPaymant=5,
        interacPaymant=6,
        visaCardPaymant=7,
        masterCardPaymant = 8
    }
    
    public enum currencyType
    { 
        Real=1,
        UnReal=2
    }
}
