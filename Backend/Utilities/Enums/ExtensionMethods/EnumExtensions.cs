using System.Reflection;

namespace Utilities.Enums.ExtensionMethods
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value) 
        {
            Type valueType = value.GetType();
            MemberInfo[] memberInfo = valueType.GetMember(value.ToString());
            if ((memberInfo != null && memberInfo.Length > 0)) 
            {
                var _Attribs = memberInfo[0].GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
                if ((_Attribs != null && _Attribs.Count() > 0)) 
                {
                    return ((System.ComponentModel.DescriptionAttribute)_Attribs.ElementAt(0)).Description;
                }
            }
            return value.ToString();
        }

        public static IEnumerable<KeyValuePair<int, string>> GetEnumDescription<T>() where T : Enum
        {
            return Enum.GetValues(typeof(T))
                .Cast<T>()
                .Select(x => new KeyValuePair<int, string>(Convert.ToInt32(x), x.GetDescription()));
        }
    }
}
