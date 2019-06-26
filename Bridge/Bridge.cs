using System;
using System.Runtime.InteropServices;

using CLRLib;

namespace Bridge
{
    public class Bridge
    {
        public Bridge()
        {
            
        }

        public void CLRBridge()
        {
            var lib = new GetString();

            Console.WriteLine(lib.getStringFromCpp());
        }
        


        [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern int MessageBox(IntPtr hWnd, string lpText, string lpCaption, uint uType);

        public void DLLBridgeWindow()
        {
            MessageBox(IntPtr.Zero, "Docker管理系统后端已成功启动", "Attention!", 0);
        }


        [DllImport(@"C:\Users\Administrator\Desktop\docker-manager\x64\Debug\LogDLL.dll", CharSet = CharSet.Ansi)]
        public static extern void getMd5(string m_sourceStr, System.Text.StringBuilder m_DstStr);
        public void DLLBridge1()
        {
            string str = "DockerManagementSYstem";
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            getMd5(str, sb);
        }

        [DllImport(@"C:\Users\Administrator\Desktop\docker-manager\x64\Release\LoggingDLL.dll", EntryPoint =
       "math_add", CallingConvention = CallingConvention.StdCall)]
        public static extern int Add(int a, int b);
        public void DLLBridge()
        {
            int result = Add(1, 2);
            Console.WriteLine("result is {0}", result);
        }

        [DllImport(@"C:\Users\Administrator\Desktop\docker-manager\x64\Release\LoggingDLL.dll", EntryPoint =
       "math_add", CallingConvention = CallingConvention.StdCall)]
        public static extern void checkSecret(string enc_str, string key, System.Text.StringBuilder out_str);
        public string DLLBridgeCheck(string enc_str, string key)
        {
            System.Text.StringBuilder out_str = new System.Text.StringBuilder();
            checkSecret(enc_str, key, out_str);

            return out_str.ToString();
        }

    }
}
