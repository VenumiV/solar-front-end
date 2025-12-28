import { CreateSolarUnitForm } from "./components/CreateSolarUnitForm";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SolarUnitCreatePage() {
  return (
    <main className="mt-4 px-4 sm:px-6 lg:px-8">
      <Link to="/admin/solar-units">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Solar Units
        </Button>
      </Link>
      
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Create Solar Unit</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Add a new solar unit and optionally assign it to a user
        </p>
      </div>
      
      <div className="max-w-2xl">
        <Card className="p-6 sm:p-8">
          <CreateSolarUnitForm />
        </Card>
      </div>
    </main>
  );
}