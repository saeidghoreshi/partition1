using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Excel = Microsoft.Office.Interop.Excel;

namespace ConsoleApplication1.Office
{
    //add referencve microsoft.office.interop.excel
    public class excel
    {
        public excel() 
        {
            var excel = new Excel.Application();
            var workbook = excel.Workbooks.Add();
            var sheet = excel.ActiveSheet;


            excel.Visible = true;

            excel.Cells[1, 1] = "Hi from Me";
            excel.Columns[1].AutoFit();

            excel.Cells[2,1]=10;
            excel.Cells[3, 1] = 10;
            excel.Cells[4, 1] = 20;
            excel.Cells[5, 1] = 30;
            excel.Cells[6, 1] = 40;
            excel.Cells[7, 1] = 50;
            excel.Cells[8, 1] = 60;

            var chart = workbook.Charts.Add(After:sheet);
            chart.ChartWizard(Source:sheet.Range("A2","A7"));
                        
        }
    }
}
