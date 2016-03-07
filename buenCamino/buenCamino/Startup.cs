using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(buenCamino.Startup))]
namespace buenCamino
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
