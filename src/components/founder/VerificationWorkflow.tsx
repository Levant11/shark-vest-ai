import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Upload, Link as LinkIcon, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface VerificationTask {
  id: string;
  task_name: string;
  task_description: string;
  task_order: number;
  points: number;
}

interface UserVerification {
  task_id: string;
  completed: boolean;
}

export const VerificationWorkflow = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<VerificationTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVerificationTasks();
    }
  }, [user]);

  const fetchVerificationTasks = async () => {
    try {
      // Fetch all verification tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('verification_tasks')
        .select('*')
        .order('task_order');

      if (tasksError) throw tasksError;

      // Fetch user's completed verifications
      const { data: userVerifications, error: verificationError } = await supabase
        .from('user_verifications')
        .select('task_id, completed')
        .eq('user_id', user?.id)
        .eq('completed', true);

      if (verificationError) throw verificationError;

      setTasks(tasksData || []);
      setCompletedTasks(new Set(userVerifications?.map(v => v.task_id) || []));
    } catch (error: any) {
      toast.error('Failed to load verification tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAction = async (taskId: string, taskName: string) => {
    // For now, this is a placeholder - actual implementation will vary by task type
    toast.info(`Starting ${taskName} verification...`);
    
    // Mark as completed (placeholder)
    try {
      const { error } = await supabase
        .from('user_verifications')
        .upsert({
          user_id: user?.id,
          task_id: taskId,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      setCompletedTasks(prev => new Set([...prev, taskId]));
      toast.success('Verification task completed!');
    } catch (error: any) {
      toast.error('Failed to update verification status');
    }
  };

  const getTaskIcon = (taskName: string) => {
    if (taskName.includes('upload') || taskName.includes('id')) return Upload;
    if (taskName.includes('social') || taskName.includes('link')) return LinkIcon;
    return FileText;
  };

  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const earnedPoints = tasks
    .filter(task => completedTasks.has(task.id))
    .reduce((sum, task) => sum + task.points, 0);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Verification Center</CardTitle>
            <CardDescription>
              Complete these tasks to increase your Trust Score
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {earnedPoints}/{totalPoints} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const isCompleted = completedTasks.has(task.id);
            const TaskIcon = getTaskIcon(task.task_name);

            return (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  isCompleted
                    ? 'border-green-500/30 bg-green-50/50 dark:bg-green-950/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <TaskIcon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{task.task_description}</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn {task.points} points
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {isCompleted ? (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      Completed
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleTaskAction(task.id, task.task_description)}
                    >
                      Start
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {tasks.length === completedTasks.size && tasks.length > 0 && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
            <p className="text-center text-sm font-medium">
              🎉 Congratulations! You've completed all verification tasks!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
