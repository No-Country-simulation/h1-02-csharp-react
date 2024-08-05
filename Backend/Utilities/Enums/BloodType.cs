using System.ComponentModel;

namespace Utilities.Enums
{
    public enum BloodType
    {
        [Description("A+")]
        APositive = 0,
        [Description("B+")]
        BPositive = 1,
        [Description("A-")]
        ANegative = 2,
        [Description("B-")]
        BNegative = 3,
        [Description("AB+")]
        ABPositive = 4,
        [Description("AB-")]
        ABNegative = 5,
        [Description("0+")]
        OPositive = 6,
        [Description("0-")]
        ONegative = 7
    }
}
