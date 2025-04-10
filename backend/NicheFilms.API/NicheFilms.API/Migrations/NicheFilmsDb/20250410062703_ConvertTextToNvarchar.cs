using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NicheFilms.API.Migrations.NicheFilmsDb
{
    /// <inheritdoc />
    public partial class ConvertTextToNvarchar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "movies_users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    age = table.Column<int>(type: "int", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Netflix = table.Column<bool>(type: "bit", nullable: true),
                    AmazonPrime = table.Column<bool>(name: "Amazon Prime", type: "bit", nullable: true),
                    Disney = table.Column<bool>(name: "Disney+", type: "bit", nullable: true),
                    Paramount = table.Column<bool>(name: "Paramount+", type: "bit", nullable: true),
                    Max = table.Column<bool>(type: "bit", nullable: true),
                    Hulu = table.Column<bool>(type: "bit", nullable: true),
                    AppleTV = table.Column<bool>(name: "Apple TV+", type: "bit", nullable: true),
                    Peacock = table.Column<bool>(type: "bit", nullable: true),
                    city = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    state = table.Column<string>(type: "char(2)", unicode: false, fixedLength: true, maxLength: 2, nullable: true),
                    zip = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: true),
                    binned_age = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__movies_u__B9BE370FEEC98B61", x => x.user_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movies_users");
        }
    }
}
