import platform
import sys
import subprocess
import os

class BaseInstall:

    def __init__(self, config: dict | None = None) -> None:
        self.config = config

    def start(self):
        print("Starting before installation process...")
        self.preInstall()
        print("Starting installation process...")
        self.onInstall()
        print("Starting after intallation process...")
        self.afterInstall()

    def preInstall(self):
        pass

    def onInstall(self):
        pass

    def afterInstall(self):
        pass


class LinuxInstall(BaseInstall):
    pass


class WindowsInstall(BaseInstall):
    pass


class Main:

    def __init__(self, devMode: bool = False) -> None:
        self.welcome_message()
        self.config = {}
        self.devMode = devMode
        self.already_have_db = False

    def start(self):
        self.pre_installation()
        self.on_install()
        self.after_install()

    def welcome_message(self):
        print("WAB installation...")
        print(f"Running on {platform.system()} {platform.architecture()[0]}")
        print("\n\n")

    def install_db(self):
        pass

    def pre_installation(self):
        while True:
            a = str(input("Do you want to start? [y/n] ")).upper()
            if a not in ["Y", "N"]: continue
            if a == "N":
                print("See you!")
                exit(0)
            else:
                break




        if platform.system() == "Linux":
            if self.prompt_sudo() != 0:
                print("We need access to root-like privileges, in order to install the WAB application.")
                print("Please execute with sudo, or enter the password when is requested.")
                exit(1)
            while True:
                a = str(
                    input("Do you already have a postgres SQL database? [y/n]")
                ).upper()
                if a not in ["Y", "N"]: continue
                if a == "Y":
                    self.already_have_db = True
                break
        else:
            self.already_have_db = True
            print(
                "\nYou operations system is not supported for installation of the database. Please consider installing a postgres DB manual on machine."
            )

        print("Please enter the connection settings:")

        self.config["db_host"] = str(
            input("\t Hostname [localhost]: ")).strip()
        self.config["db_port"] = str(input("\t Port [5432]: ")).strip()
        self.config["db_adminUser"] = str(
            input("\t Admin username [postgres]: ")).strip()
        self.config["db_adminPass"] = str(
            input("\t Admin user password []: ")).strip()

        if len(self.config["db_host"]) == 0:
            self.config["db_host"] = "localhost"
        if len(self.config["db_port"]) == 0:
            self.config["db_port"] = "5432"
        if len(self.config["db_adminUser"]) == 0:
            self.config["db_adminUser"] = "postgres"

        if not self.already_have_db:
            self.install_db()

    def on_install(self):
        if platform.system() == "Linux": instance = LinuxInstall(self.config)
        elif platform.system() == "Windows":
            instance = WindowsInstall(self.config)
        else:
            print(f"OS {platform.system()} not supported")
            return

        instance.start()

    def after_install(self):
        pass

    def prompt_sudo(self):
        ret = 0
        if os.geteuid() != 0:
            msg = "[sudo] password for %u:"
            ret = subprocess.check_call("sudo -v -p '%s'" % msg, shell=True)
        return ret

if __name__ == "__main__":
    try:
        devMode = ""
        if len(sys.argv) > 1:
            devMode = sys.argv[1]

        if devMode.lower() == "development":
            print("Starting in dev Mode...")
            a = Main(devMode=True)
        else:
            a = Main()

    except Exception as err:
        print("An error occured while tring to install the WAB Application.")
        print(err)
