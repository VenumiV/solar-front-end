import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateSolarUnitMutation, useGetAllUsersQuery } from "@/lib/redux/query"
import { useNavigate } from "react-router"

const formSchema = z.object({
    serialNumber: z.string().min(1, { message: "Serial number is required" }),
    installationDate: z.string().min(1, { message: "Installation date is required" }),
    capacity: z.number().positive({ message: "Capacity must be a positive number" }),
    status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
    userId: z.string().min(1, { message: "User is required" }).optional(),
});

export function CreateSolarUnitForm({ onSuccess }) {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serialNumber: "",
            installationDate: "",
            capacity: 0,
            status: "ACTIVE",
            userId: undefined,
        },
    })

    const [createSolarUnit, { isLoading: isCreatingSolarUnit }] = useCreateSolarUnitMutation();
    const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();

    async function onSubmit(values) {
        try {
            const dataToSend = {
                serialNumber: values.serialNumber,
                installationDate: values.installationDate,
                capacity: values.capacity,
                status: values.status,
                ...(values.userId && values.userId !== "none" && { userId: values.userId }),
            };
            await createSolarUnit(dataToSend).unwrap();
            form.reset();
            if (onSuccess) {
                onSuccess();
            } else {
                navigate("/admin/solar-units");
            }
        } catch (error) {
            console.error("Error creating solar unit:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Serial Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter serial number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="installationDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Installation Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Capacity (kW)</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder="Enter capacity" 
                                    {...field} 
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign to User (Optional)</FormLabel>
                            <FormControl>
                                <Select 
                                    value={field.value || "none"} 
                                    onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a user (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No user assigned</SelectItem>
                                        {isLoadingUsers ? (
                                            <SelectItem value="loading" disabled>Loading users...</SelectItem>
                                        ) : (
                                            users?.map((user) => (
                                                <SelectItem key={user._id} value={user._id}>
                                                    {user.email} {user.firstName && `(${user.firstName} ${user.lastName || ""})`}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-3 justify-end">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                            if (onSuccess) {
                                onSuccess();
                            } else {
                                navigate("/admin/solar-units");
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isCreatingSolarUnit}>
                        {isCreatingSolarUnit ? "Creating..." : "Create Solar Unit"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}