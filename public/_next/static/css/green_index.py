import pandas as pd

#importing data
df = pd.read_csv("zero_tracker.csv")

#columnns we are considering to calculate green index
cols = ["end_target_status", "gasses_coverage", "reporting_mechanism", "has_plan", "accountability"]

#end_target_status
target = list(df["end_target_status"].unique())
#marking scheme
t_values = [3, 5, 4, 7, 7, 0, 5, 10]
target_dict = {target[i] : t_values[i] for i in range(len(target))}

#gasses_coverage
gas = list(df["gasses_coverage"].unique())
#marking scheme
g_values = [0, 10, 5, 0]
gas_dict = {gas[i] : g_values[i] for i in range(len(gas))}

#reporting_mechanism
report = list(df["reporting_mechanism"].unique())
#marking scheme
r_values = [2.5, 5, 0, 0]
report_dict = {report[i] : r_values[i] for i in range(len(report))}

#has_plan
plan = list(df["has_plan"].unique())
#marking scheme
p_values = [0, 5, 0]
plan_dict = {plan[i] : p_values[i] for i in range(len(plan))}

#accountability 
acc = list(df["accountability"].unique())
#marking scheme
a_values = [0, 0, 0, 5]
acc_dict = {acc[i] : a_values[i] for i in range(len(acc))}

#green index
df["green index"] = " "

for i in range(len(df)):
    a = list(df[cols].iloc[i])
    res = 0
    res = target_dict[a[0]] + gas_dict[a[1]] + report_dict[a[2]] + plan_dict[a[3]] + acc_dict[a[4]]
    df["green index"].iloc[i] = res

#saving the data to a csv file
df.to_csv("zt_data_with_gi.csv")