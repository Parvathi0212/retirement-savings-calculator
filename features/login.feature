Feature: Calculate retirement savings

  Background:
  Given I login the Pre-retirement calculator application
    
    Scenario: User should be able to submit form with all required fields filled in 
     When I input the data with required details
      | Current Age             | 55              |
      | Retirement Age          | 68              |
      | Current Salary          | 10000         |
      | Spouse Salary           | 7500         |
      | Current Savings         | 5000         |
      | Retirement Contribution | 11              |
      | Increase Rate           | 2               |
      | Social Security benefits|   Yes           |
      |   Marital Status        |   Single     | 
      |  SS override amount     | 7000        | 
      Then I should validate the results 

  Scenario: Additional Social Security fields should display/hide based on Social Security benefits toggle

     When I input the data with required details
      | Current Age             | 25              |
      | Retirement Age          | 64              |
      | Current Salary          | 75000         |
      | Spouse Salary           | 50000          |
      | Current Savings         | 250000         |
      | Retirement Contribution | 2              |
      | Increase Rate           | 0               |
      | Social Security benefits|   No           |
      |   Marital Status        |   Married       |              
      |  SS override amount     |   4000        | 
      Then validate  Social Security Additional fields are hidden

  Scenario Outline: User should be able to submit form with all fields filled in

     When I input the data with required details
      | Current Age             | 100              |
      | Retirement Age          | 64              |
      | Current Salary          |  2000           |
      | Spouse Salary           | 2000          |
      | Current Savings         | 56000         |
      | Retirement Contribution | 2              |
      | Increase Rate           | 0               |
      | Social Security benefits|   No           |
      |   Marital Status        |   Married       |              
      |  SS override amount     |   4000        | 
      Then validate message displayed <mesaage>
      Examples:
          | mesaage | 
          | Please fill out all required fields   |
          | Planned retirement age must be greater than current age |

  Scenario Outline: User should be able to update default calculator values
    When I update below values on default calculator page
      | Other Income               | 1000      |
      | Retirement Duration        | 15        |
      | Retirement Annual Income   |  9        |
      | Pre-retirement investment  | 4         |
      | Post-retirement investment | 6         |
     When I input the data with required details
      | Current Age             | 30              |
      | Retirement Age          | 64              |
      | Current Salary          |  2000           |
      | Spouse Salary           | 2000          |
      | Current Savings         | 56000         |
      | Retirement Contribution | 2              |
      | Increase Rate           | 0               |
      | Social Security benefits|   No           |
      |   Marital Status        |   Married       |              
      |  SS override amount     |   4000        | 
      Then I should validate the results 
      