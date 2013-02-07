﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18034
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AccountingServiceClient.ServiceReferenceAzure {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="Invoice", Namespace="http://domain/testData")]
    [System.SerializableAttribute()]
    public partial class Invoice : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int currencyIDField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int invoiceIDField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int issuerEntityIDField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int receiverEntityIDField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int currencyID {
            get {
                return this.currencyIDField;
            }
            set {
                if ((this.currencyIDField.Equals(value) != true)) {
                    this.currencyIDField = value;
                    this.RaisePropertyChanged("currencyID");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int invoiceID {
            get {
                return this.invoiceIDField;
            }
            set {
                if ((this.invoiceIDField.Equals(value) != true)) {
                    this.invoiceIDField = value;
                    this.RaisePropertyChanged("invoiceID");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int issuerEntityID {
            get {
                return this.issuerEntityIDField;
            }
            set {
                if ((this.issuerEntityIDField.Equals(value) != true)) {
                    this.issuerEntityIDField = value;
                    this.RaisePropertyChanged("issuerEntityID");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int receiverEntityID {
            get {
                return this.receiverEntityIDField;
            }
            set {
                if ((this.receiverEntityIDField.Equals(value) != true)) {
                    this.receiverEntityIDField = value;
                    this.RaisePropertyChanged("receiverEntityID");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReferenceAzure.IAccountingV1")]
    public interface IAccountingV1 {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IAccountingV1/getInvoiceServicesSumAmt", ReplyAction="http://tempuri.org/IAccountingV1/getInvoiceServicesSumAmtResponse")]
        AccountingServiceClient.ServiceReferenceAzure.Invoice getInvoiceServicesSumAmt();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IAccountingV1Channel : AccountingServiceClient.ServiceReferenceAzure.IAccountingV1, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class AccountingV1Client : System.ServiceModel.ClientBase<AccountingServiceClient.ServiceReferenceAzure.IAccountingV1>, AccountingServiceClient.ServiceReferenceAzure.IAccountingV1 {
        
        public AccountingV1Client() {
        }
        
        public AccountingV1Client(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public AccountingV1Client(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public AccountingV1Client(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public AccountingV1Client(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public AccountingServiceClient.ServiceReferenceAzure.Invoice getInvoiceServicesSumAmt() {
            return base.Channel.getInvoiceServicesSumAmt();
        }
    }
}