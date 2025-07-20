const r=`#
# Terraform configuration file
#

# provider_installation isolates provider installation behaviors.
# For more information, see: https://www.terraform.io/docs/cli/config/config-file.html#provider-installation
provider_installation {

  # direct specifies a list of providers that Terraform can install directly.
  # It is a map of provider source addresses to a list of locations to search for that provider.
  direct {
    "hashicorp/aws" = ["/usr/local/bin/terraform-provider-aws"]
  }

  # filesystem_mirror specifies a directory on the local filesystem that acts as a mirror for providers.
  filesystem_mirror {
    path    = "/usr/share/terraform/providers"
    include = ["hashicorp/*"]
  }

  # network_mirror specifies a URL to a remote service that acts as a mirror for providers.
  network_mirror {
    url = "https://terraform-mirror.example.com/"
    include = ["hashicorp/*"]
  }
}
`;export{r as default};
