using System.ComponentModel;

namespace Utilities.Enums
{
    public enum IdentificationType
    {
        [Description("Documento único")]
        DU = 0,
        [Description("Libreta de Enrolamiento")]
        LE = 1,
        [Description("Libreta Cívica")]
        LC = 2,
        [Description("Pasaporte")]
        PA = 3,
        [Description("Certificado Migratorio")]
        CM = 4,
        [Description("En trámite (Recién nacidos)")]
        ET = 5
    }
}
