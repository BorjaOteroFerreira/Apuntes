# Converts a SPSS data file to a Stata data file

# INSTALL PACKAGES
# install.packages(c("Hmisc", "foreign", "memisc"))

require(Hmisc)
require(foreign)
require(memisc)

# SET FILEPATH
setwd("~/spss-converter/") # Set working directory
fileName <- "cnn2012002.por" # Enter file name with .sav extension

# LOAD DATA AND CONVERT TO DATAFRAME
pkg.env <- new.env()
tryCatch(
  {
    pkg.env$data <- spss.get(fileName, use.value.labels=TRUE) # This may take some time
  },
  warning = function(war) {
    print(war)
    print ("Warning parsing .por file, trying again with memisc instead")
    pkg.env$data <- as.data.frame(as.data.set(spss.portable.file(fileName))) # This may take some time
 },
  error = function(err) {
    print (err)
    print ("Error parsing .por file, trying again with memisc instead")
    pkg.env$data <- as.data.frame(as.data.set(spss.portable.file(fileName))) # This may take some time
  }
)

# WRITE AS DTA AND CSV
write.dta(pkg.env$data, sub(".por", ".dta", fileName)) # Will write .dta file with same fileName
write.csv(pkg.env$data, sub(".por", ".csv", fileName)) # Will write .csv file with same fileName