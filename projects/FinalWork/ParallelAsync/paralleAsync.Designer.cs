namespace ParallelAsync
{
    public partial class paralleAsync
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btn_testConcurrency = new System.Windows.Forms.Button();
            this.lbl_ConcurrencyResult = new System.Windows.Forms.Label();
            this.btn_cancelmp = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btn_testConcurrency
            // 
            this.btn_testConcurrency.Location = new System.Drawing.Point(12, 12);
            this.btn_testConcurrency.Name = "btn_testConcurrency";
            this.btn_testConcurrency.Size = new System.Drawing.Size(101, 23);
            this.btn_testConcurrency.TabIndex = 0;
            this.btn_testConcurrency.Text = "TestConcurrency";
            this.btn_testConcurrency.UseVisualStyleBackColor = true;
            this.btn_testConcurrency.Click += new System.EventHandler(this.btn_testConcurrency_Click);
            // 
            // lbl_ConcurrencyResult
            // 
            this.lbl_ConcurrencyResult.Location = new System.Drawing.Point(119, 16);
            this.lbl_ConcurrencyResult.Name = "lbl_ConcurrencyResult";
            this.lbl_ConcurrencyResult.Size = new System.Drawing.Size(282, 213);
            this.lbl_ConcurrencyResult.TabIndex = 1;
            this.lbl_ConcurrencyResult.Text = "Result";
            // 
            // btn_cancelmp
            // 
            this.btn_cancelmp.Location = new System.Drawing.Point(12, 203);
            this.btn_cancelmp.Name = "btn_cancelmp";
            this.btn_cancelmp.Size = new System.Drawing.Size(131, 23);
            this.btn_cancelmp.TabIndex = 2;
            this.btn_cancelmp.Text = "Cancel Map-Reduce";
            this.btn_cancelmp.UseVisualStyleBackColor = true;
            this.btn_cancelmp.Click += new System.EventHandler(this.btn_cancelmp_Click);
            // 
            // paralleAsync
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(413, 238);
            this.Controls.Add(this.btn_cancelmp);
            this.Controls.Add(this.lbl_ConcurrencyResult);
            this.Controls.Add(this.btn_testConcurrency);
            this.Name = "paralleAsync";
            this.Text = "AsynsParallel";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn_testConcurrency;
        private System.Windows.Forms.Label lbl_ConcurrencyResult;
        private System.Windows.Forms.Button btn_cancelmp;
    }
}

