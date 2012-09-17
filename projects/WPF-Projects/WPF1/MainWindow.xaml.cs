using System.Linq;
using System.Windows;


using System.Threading;
using System.Windows.Threading;

using System.Reactive.Linq;
using System.Reactive;
using System.Reactive.Concurrency;




//reactive main libvraray installation by nuget
//install wpf helper

namespace WPF1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public string stringwait(string str)
        {
            Thread.Sleep(250);
            return str;
        }

        private void Start_Click(object sender, RoutedEventArgs e)
        {
            
        }
    }
}
